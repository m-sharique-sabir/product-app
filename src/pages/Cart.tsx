import { Trash2, Plus, Minus, ArrowRight, X, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, user } = useCart();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  
  const SHIPPING_COST = 10;
  
  // Delete Modal State
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  // Filter items based on search
  const filteredCart = cart.filter(item => 
      item.title.toLowerCase().includes(searchQuery)
  );

  const confirmDelete = (id: number) => {
    setItemToDelete(id);
  };

  const executeDelete = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
  };

  // Helper to find item details for modal
  const itemInModal = cart.find(item => item.id === itemToDelete);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">You are not logged in</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          Please login to view your saved items and continue shopping.
        </p>
        <Link 
          to="/login" 
          className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
        >
          Login Now
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you love!
        </p>
        <Link 
          to="/" 
          className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shopping Cart</h1>
        {searchQuery && (
             <p className="text-gray-500 dark:text-gray-400">
                Searching for: <span className="font-semibold text-indigo-600 dark:text-indigo-400">"{searchQuery}"</span>
             </p>
        )}
      </div>

      {filteredCart.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
             <p className="text-xl text-gray-600 dark:text-gray-300">No items match your search.</p>
             <button 
                onClick={() => window.history.back()}
                className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
             >
                Go back or Clear Search
             </button>
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1 space-y-6">
          {filteredCart.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-lg hover:opacity-90 transition-opacity"
                />
              </Link>
              
              <div className="flex-1 text-center sm:text-left">
                <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors">{item.title || (item as any).name || 'Unknown Product'}</h3>
                </Link>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">${(Number(item.price) || 0).toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 dark:border-gray-600 border-md rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors border-r border-gray-200 dark:border-gray-600"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 px-2">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors border-l border-gray-200 dark:border-gray-600"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => confirmDelete(item.id)}
                  className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24 transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Shipping</span>
                <span>${SHIPPING_COST.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
                <span>Total</span>
                <span>${(totalPrice + SHIPPING_COST).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Proceed to Checkout
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Free shipping on orders over $200. Secure checkout.
            </p>
          </div>
        </div>
      </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                onClick={cancelDelete}
            ></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full shrink-0">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Remove from Cart?</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            Are you sure you want to remove this item from your cart?
                        </p>
                        
                        {itemInModal && (
                            <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                                <img 
                                    src={itemInModal.image} 
                                    alt={itemInModal.title} 
                                    className="w-32 h-32 object-cover rounded-lg shadow-sm"
                                />
                                <div className="text-center">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg line-clamp-1">{itemInModal.title}</p>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mt-1"><span className="text-gray-500 dark:text-gray-400 text-sm mt-1 px-2">Quantity: </span>{itemInModal.quantity}</span>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl mt-1"><span className="text-gray-500 dark:text-gray-400 text-sm mt-1 px-2">Per Item: </span>${(Number(itemInModal.price) || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 justify-center">
                            <button 
                                onClick={cancelDelete}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={executeDelete}
                                className="px-4 py-2 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                            >
                                Yes, Remove
                            </button>
                        </div>
                    </div>
                    <button 
                        onClick={cancelDelete} 
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
