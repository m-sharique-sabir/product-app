import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services/authService';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  category: any;
}

const ProductCard = ({ id, image, title, price, rating, reviews, category }: ProductCardProps) => {
  const { addToCart } = useCart();

  // Hook for navigation
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicked within Link

    if (!authService.isAuthenticated()) {
      toast.error('Authentication required! Please login to add items to your cart.');
      navigate('/login');
      return;
    }

    addToCart({ id, title, price, image });
    toast.success(`${title} added to cart`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${id}`} className="block relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={image.startsWith('http') ? image : image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
            <button className="z-10 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
        </div>
        <div className="absolute top-3 left-3 bg-indigo-600 dark:bg-indigo-500 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg">
            {typeof category === 'object' ? category?.name : (category || 'Item')}
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({reviews})</span>
        </div>
        
        <Link to={`/product/${id}`}>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 hover:underline transition-colors">{title}</h3>
        </Link>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
