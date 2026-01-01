interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  addedAt: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

class CartService {
  private readonly CART_KEY = 'user_cart';
  private readonly PRODUCTS_KEY = 'app_products';

  // Get cart items for current user
  private getCartItems(): CartItem[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  // Save cart items to localStorage
  private saveCartItems(items: CartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
  }

  // Clear all data for debugging
  clearAllData(): void {
    localStorage.removeItem(this.CART_KEY);
    localStorage.removeItem(this.PRODUCTS_KEY);
    console.log('All localStorage data cleared');
  }

  // Get all products (mock data for demo)
  private getProducts(): Product[] {
    const products = localStorage.getItem(this.PRODUCTS_KEY);
    if (products) {
      try {
        const parsedProducts = JSON.parse(products);
        console.log(`Found ${parsedProducts.length} products in localStorage`);
        // Check if we have all 18 products, if not, clear and reload
        if (parsedProducts.length < 18) {
          console.log('Found incomplete product data, clearing and reloading...');
          localStorage.removeItem(this.PRODUCTS_KEY);
        } else {
          return parsedProducts;
        }
      } catch (error) {
        console.error('Error parsing products from localStorage:', error);
        localStorage.removeItem(this.PRODUCTS_KEY);
      }
    }

    // Default products if none exist
    const defaultProducts: Product[] = [
      {
        id: '1',
        title: 'Wireless Headphones',
        price: 99.99,
        image: '/wireless-headphones.jpg',
        category: 'headphones',
        description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
        rating: 4.5,
        reviews: 124
      },
      {
        id: '2',
        title: 'Smart Watch',
        price: 299.99,
        image: '/Smart-Watch.jpg',
        category: 'watch',
        description: 'Advanced smartwatch with fitness tracking, heart rate monitoring, and smartphone connectivity.',
        rating: 4.7,
        reviews: 89
      },
      {
        id: '3',
        title: 'Laptop',
        price: 49.99,
        image: '/Laptop.jpg',
        category: 'laptops',
        description: 'High-performance laptop with modern design and powerful specifications.',
        rating: 4.3,
        reviews: 156
      },
      {
        id: '4',
        title: 'Bluetooth Speaker',
        price: 159.99,
        image: '/Bluetooth-Speaker.jpg',
        category: 'speakers',
        description: 'Premium Bluetooth speaker with rich sound quality and portable design.',
        rating: 4.6,
        reviews: 203
      },
      {
        id: '5',
        title: 'Smart Phone',
        price: 19.99,
        image: '/smart-phone.jpg',
        category: 'mobile',
        description: 'Latest smartphone with advanced features and sleek design.',
        rating: 4.2,
        reviews: 78
      },
      {
        id: '6',
        title: 'Wireless Headphones Pro',
        price: 149.99,
        image: '/wireless-headphones-2.jpg',
        category: 'headphones',
        description: 'Premium wireless headphones with advanced noise cancellation and extended battery life.',
        rating: 4.8,
        reviews: 167
      },
      {
        id: '7',
        title: 'Wireless Headphones Elite',
        price: 199.99,
        image: '/wireless-headphones-3.jpg',
        category: 'headphones',
        description: 'Elite wireless headphones with studio-quality sound and luxury comfort.',
        rating: 4.9,
        reviews: 89
      },
      {
        id: '8',
        title: 'Smart Watch Pro',
        price: 399.99,
        image: '/Smart Watch -2.jpg',
        category: 'watch',
        description: 'Professional smartwatch with advanced health monitoring and GPS tracking.',
        rating: 4.8,
        reviews: 145
      },
      {
        id: '9',
        title: 'Smart Watch Elite',
        price: 499.99,
        image: '/Smart Watch -3.jpg',
        category: 'watch',
        description: 'Elite smartwatch with titanium build and premium features for professionals.',
        rating: 4.9,
        reviews: 76
      },
      {
        id: '10',
        title: 'Gaming Laptop',
        price: 1299.99,
        image: '/Laptop-2.jpg',
        category: 'laptops',
        description: 'High-performance gaming laptop with dedicated graphics and RGB lighting.',
        rating: 4.7,
        reviews: 234
      },
      {
        id: '11',
        title: 'Ultrabook',
        price: 899.99,
        image: '/Laptop-3.jpg',
        category: 'laptops',
        description: 'Lightweight ultrabook with all-day battery life and premium build quality.',
        rating: 4.6,
        reviews: 178
      },
      {
        id: '12',
        title: 'Bluetooth Speaker Pro',
        price: 199.99,
        image: '/Bluetooth-Speaker-2.jpg',
        category: 'speakers',
        description: 'Professional Bluetooth speaker with waterproof design and 360-degree sound.',
        rating: 4.7,
        reviews: 156
      },
      {
        id: '13',
        title: 'Smart Phone Pro',
        price: 899.99,
        image: '/smart-phone-2.jpg',
        category: 'mobile',
        description: 'Professional smartphone with advanced camera system and premium materials.',
        rating: 4.8,
        reviews: 267
      },
      {
        id: '14',
        title: 'Tablet',
        price: 399.99,
        image: '/wireless-headphones.jpg',
        category: 'tablets',
        description: 'High-resolution tablet perfect for productivity and entertainment.',
        rating: 4.5,
        reviews: 123
      },
      {
        id: '15',
        title: 'Smart Watch Sport',
        price: 249.99,
        image: '/Smart-Watch.jpg',
        category: 'watch',
        description: 'Sport-focused smartwatch with fitness tracking and durable design.',
        rating: 4.6,
        reviews: 98
      },
      {
        id: '16',
        title: 'Portable Speaker',
        price: 79.99,
        image: '/Bluetooth-Speaker.jpg',
        category: 'speakers',
        description: 'Compact portable speaker with powerful sound and long battery life.',
        rating: 4.4,
        reviews: 187
      },
      {
        id: '17',
        title: 'Business Laptop',
        price: 799.99,
        image: '/Laptop.jpg',
        category: 'laptops',
        description: 'Reliable business laptop with security features and professional performance.',
        rating: 4.5,
        reviews: 145
      },
      {
        id: '18',
        title: 'Smart Phone Lite',
        price: 299.99,
        image: '/smart-phone.jpg',
        category: 'mobile',
        description: 'Affordable smartphone with essential features and great battery life.',
        rating: 4.3,
        reviews: 234
      }
    ];

    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
  }

  // Get product by ID
  getProductById(id: string): Product | null {
    const products = this.getProducts();
    return products.find(product => product.id === id) || null;
  }

  // Get all products
  getAllProducts(): Product[] {
    return this.getProducts();
  }

  // Get cart items with product details
  async getCart(): Promise<Array<CartItem & { product: Product }>> {
    const cartItems = this.getCartItems();
    const products = this.getProducts();
    
    return cartItems.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId) || {} as Product
    })).filter(item => item.product.id); // Filter out items with missing products
  }

  // Add item to cart
  async addToCart(productId: string, quantity: number = 1): Promise<void> {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(item => item.productId === productId);

    if (existingItem) {
      // Update quantity if item already exists
      existingItem.quantity += quantity;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId,
        quantity,
        addedAt: new Date().toISOString()
      };
      cartItems.push(newItem);
    }

    this.saveCartItems(cartItems);
  }

  // Update item quantity
  async updateQuantity(itemId: string, quantity: number): Promise<void> {
    const cartItems = this.getCartItems();
    const itemIndex = cartItems.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cartItems.splice(itemIndex, 1);
      } else {
        // Update quantity
        cartItems[itemIndex].quantity = quantity;
      }
      this.saveCartItems(cartItems);
    }
  }

  // Remove item from cart
  async removeFromCart(itemId: string): Promise<void> {
    const cartItems = this.getCartItems();
    const filteredItems = cartItems.filter(item => item.id !== itemId);
    this.saveCartItems(filteredItems);
  }

  // Clear entire cart
  async clearCart(): Promise<void> {
    this.saveCartItems([]);
  }

  // Get cart total
  async getCartTotal(): Promise<number> {
    const cartItems = await this.getCart();
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  // Get cart item count
  async getCartItemCount(): Promise<number> {
    const cartItems = this.getCartItems();
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  // Check if product is in cart
  isInCart(productId: string): boolean {
    const cartItems = this.getCartItems();
    return cartItems.some(item => item.productId === productId);
  }

  // Get cart item for specific product
  getCartItemForProduct(productId: string): CartItem | null {
    const cartItems = this.getCartItems();
    return cartItems.find(item => item.productId === productId) || null;
  }
}

export const cartService = new CartService();

// Initialize products on service creation
cartService.getAllProducts();
export type { CartItem, Product };
