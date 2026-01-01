import { Menu, Search, ShoppingCart, User, X, LogOut, UserCircle, ChevronDown, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { userPreferencesService } from './Sidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { totalItems, user, logout } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    const contextAwarePages = ['/', '/shop', '/cart'];
    const isContextPage = contextAwarePages.includes(location.pathname);

    // If on a context-aware page, update the URL params in place
    if (isContextPage) {
        setSearchParams(prev => {
            if (value) {
                prev.set('search', value);
                // Add to search history for persistence
                userPreferencesService.addToSearchHistory(value);
            } else {
                prev.delete('search');
            }
            return prev;
        });
    } else {
        // Otherwise, redirect to shop with search
        navigate(`/shop?search=${value}`);
        // Add to search history for persistence
        userPreferencesService.addToSearchHistory(value);
    }
  };

  // Sync local input with URL param (for initial load or back button)
  const searchValue = searchParams.get('search') || '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">M-Sharique-Sabir</Link>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            {location.pathname !== '/profile' && (
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>

            <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">Shop</Link>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <div className="h-8 w-8 border border-indigo-100 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center">
                      {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                    </div>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50 transition-colors duration-200">
                      <div className="px-2 py-3">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">{user.name}</p>
                          <p className="text-xs leading-none text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-600"></div>
                      <Link 
                        to="/profile" 
                        className="flex items-center w-full px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <UserCircle className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>Your Profile</span>
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-600"></div>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center w-full px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center">
             <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="px-4 pt-4 pb-2 space-y-3">
             <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700">Home</Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700">Login</Link>
            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700">Cart ({totalItems})</Link>
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
