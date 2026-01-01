import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { cartService } from '../services/cartService';
import { authService } from '../services/authService';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  user: any;
  login: (userData: any) => void;
  logout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  // Load cart from localStorage when user is present (on mount and login)
  useEffect(() => {
    const loadCart = async () => {
      if (!user) return; // Only load cart when user is logged in
      
      try {
        const cartData = await cartService.getCart();
        const formattedCart = cartData.map(item => ({
          id: item.productId,
          title: item.product.title,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity
        }));
        setCart(formattedCart);
      } catch (err) {
        console.error('Failed to load cart from localStorage:', err);
      }
    };
    loadCart();
  }, [user]);

  // Remove the problematic cart syncing useEffect that causes data loss

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setCart([]); // Clear UI only, keep cart data in localStorage
  };

  const addToCart = async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    try {
      await cartService.addToCart(item.id, item.quantity || 1);
      
      // Update local cart state
      setCart((prevCart) => {
        const existingItem = prevCart.find((i) => i.id === item.id);
        const safePrice = typeof item.price === 'string' 
          ? parseFloat((item.price as string).replace('$', '')) 
          : Number(item.price);
        const quantityToAdd = item.quantity || 1;

        if (existingItem) {
          return prevCart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
          );
        }
        return [...prevCart, { ...item, price: safePrice, quantity: quantityToAdd, title: item.title || 'Unknown Product' }];
      });
    } catch (err) {
      console.error('Failed to add item to cart:', err);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      // Get current cart items from service to find the cart item ID
      const cartItems = await cartService.getCart();
      const cartItemToRemove = cartItems.find(item => item.productId === productId);
      
      if (cartItemToRemove) {
        await cartService.removeFromCart(cartItemToRemove.id);
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      }
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      // Get current cart items from service to find the cart item ID
      const cartItems = await cartService.getCart();
      const cartItemToUpdate = cartItems.find(item => item.productId === productId);
      
      if (cartItemToUpdate) {
        await cartService.updateQuantity(cartItemToUpdate.id, quantity);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (err) {
      console.error('Failed to update item quantity:', err);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        user,
        login,
        logout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
