import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Star, ArrowLeft } from 'lucide-react';
import { cartService } from '../services/cartService';
import { authService } from '../services/authService';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const { cart, addToCart, updateQuantity } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = cartService.getProductById(id!);
        setProduct(productData);
      } catch (err) {
        console.error('Failed to fetch product', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Initialize quantity from cart if item exists, otherwise default to 1
  const cartItem = cart.find(item => item.id.toString() === id);
  const [quantity, setQuantity] = useState(1);

  // Sync state if cart changes externally (e.g. from sidebar)
  useEffect(() => {
    if (cartItem) {
        setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-indigo-600 animate-pulse text-2xl">Scanning Neural Link...</div>;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Product Not Found</h2>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
          Return to Shop
        </Link>
      </div>
    );
  }
  
  const updateCart = (newQty: number) => {
    if (!authService.isAuthenticated()) {
        toast.error('Authentication required! Please login to add items to your cart.');
        navigate('/login');
        return;
    }

    if (cartItem) {
        updateQuantity(product.id, newQty);
    } else {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: newQty // Use the quantity override we added to Context
        });
        toast.success('Added to cart');
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
        const newQty = quantity - 1;
        setQuantity(newQty);
        updateCart(newQty);
    }
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateCart(newQty);
  };

  const grandTotal = Number(product.price) * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-[400px] md:h-[600px] transition-colors duration-200">
          <img 
            src={product.image}
            alt={product.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <span className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest">
              {typeof product.category === 'object' ? product.category?.name : (product.category || 'Asset')}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-gray-100 mb-6 tracking-tighter">{product.title}</h1>
          
          <div className="flex items-center mb-6 space-x-4">
            <div className="flex items-center text-yellow-400">
               {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(4.5) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">(124 reviews)</span>
          </div>

          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Quantity and Total Row */}
          <div className="flex flex-row items-center gap-4 py-4 border-t border-gray-100 dark:border-gray-700 mt-8">
            {/* <span className="font-bold text-lg text-gray-900">Grand Total:</span> */}
            
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 dark:border-gray-600 border-md rounded-lg w-fit shrink-0">
              <button 
                onClick={handleDecrease}
                className="px-3 py-2 text-2xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors border-r border-gray-300 dark:border-gray-600"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 text-center font-medium text-xl min-w-[3rem] text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">{quantity}</span>
              <button 
                onClick={handleIncrease}
                className="px-3 py-2 text-2xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors border-l border-gray-300 dark:border-gray-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <span className="text-3xl font-bold px-6 text-indigo-600 dark:text-indigo-400">
                ${grandTotal.toFixed(2)}
            </span>
          </div>
          
           <button
            onClick={() => updateCart(quantity)}
            className="w-full bg-indigo-600 dark:bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg hover:shadow-xl mt-4"
          >
            <div className="flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
