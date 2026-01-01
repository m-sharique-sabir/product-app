import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, Search } from 'lucide-react';
import { cartService } from '../services/cartService';
import Sidebar, { FILTER_OPTIONS, userPreferencesService } from '../components/Sidebar';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Global Search (URL)
  const globalSearchQuery = searchParams.get('search') || '';
  
  // 2. Local Sidebar Search (State)
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  // Load user preferences from localStorage on mount
  useEffect(() => {
    const preferences = userPreferencesService.getFilterPreferences();
    setSelectedCategories(preferences.selectedCategories || []);
    setSelectedPriceRanges(preferences.selectedPriceRanges || []);
    setSelectedRatings(preferences.selectedRatings || []);
  }, []);

  // Save filter preferences to localStorage when they change
  useEffect(() => {
    const preferences = {
      selectedCategories,
      selectedPriceRanges,
      selectedRatings,
      sortBy: 'default'
    };
    userPreferencesService.saveFilterPreferences(preferences);
  }, [selectedCategories, selectedPriceRanges, selectedRatings]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const productsData = cartService.getAllProducts();
        setProducts(productsData);
        // Extract unique categories from products
        const uniqueCategories = [...new Set(productsData.map((product: any) => product.category).filter(Boolean))];
        setCategories(uniqueCategories.map((category: any) => ({ name: category })));
      } catch (err) {
        console.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // 1. Search Filter (Combines Global AND Local)
    const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;
    
    const matchesGlobalSearch = 
      product.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
      (categoryName && categoryName.toString().toLowerCase().includes(globalSearchQuery.toLowerCase()));

    const matchesLocalSearch = 
      product.title.toLowerCase().includes(localSearchQuery.toLowerCase()) || 
      (categoryName && categoryName.toString().toLowerCase().includes(localSearchQuery.toLowerCase()));

    // 2. Category Filter
    const matchesCategory = 
      selectedCategories.length === 0 || 
      (categoryName && selectedCategories.includes(categoryName.toString().toLowerCase()));
    
    // 3. Price Filter
    const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(rangeId => {
       const range = FILTER_OPTIONS.priceRanges.find(r => r.id === rangeId);
       if (!range) return false;
       return product.price >= range.min && product.price <= range.max;
    });

    // 4. Rating Filter
    const matchesRating = selectedRatings.length === 0 || selectedRatings.some(ratingId => {
        const ratingOption = FILTER_OPTIONS.ratings.find(r => r.id === ratingId);
        if (!ratingOption) return false;
        return (product.rating || 0) >= ratingOption.value;
    });

    return matchesGlobalSearch && matchesLocalSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const sidebarProps = {
    searchQuery: localSearchQuery,
    setSearchQuery: setLocalSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedPriceRanges,
    setSelectedPriceRanges,
    selectedRatings,
    setSelectedRatings,
    dynamicCategories: categories
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-indigo-600">Syncing Marketplace...</div>;

  return (
    <main className="pb-12">
        {/* We can keep or remove Hero/Categories from Shop page based on preference. 
            User didn't specify, but usually Shop page is just products. 
            "This page must display ALL products... Sidebar Filter Panel... moved into this page"
            I will keep the layout similar to current Home for now but maybe remove Hero?
            User Setup: "I have a single page displaying all products (Home)... Task: Shop Page Creation... This page must display ALL products".
            I'll keep the structure but change the title maybe? Or just keep it as is.
        */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            
            {/* Mobile Filter Toggle */}
            <button 
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                onClick={() => setIsSidebarOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 relative">
            
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <Sidebar {...sidebarProps} />
            </aside>

             {/* Sidebar - Mobile Drawer */}
            {isSidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div 
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                   onClick={() => setIsSidebarOpen(false)}
                ></div>
                <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-left duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Filters</h3>
                    <button 
                       onClick={() => setIsSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <Sidebar {...sidebarProps} />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {(globalSearchQuery || localSearchQuery) && (
                <div className="mb-6">
                    <h2 className="text-xl text-gray-900">
                        {globalSearchQuery && <span>Results for <span className="font-bold">"{globalSearchQuery}"</span></span>}
                        {globalSearchQuery && localSearchQuery && <span> refined by </span>}
                        {localSearchQuery && <span>Filter: <span className="font-bold">"{localSearchQuery}"</span></span>}
                    </h2>
                </div>
              )}

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      price={product.price}
                      rating={product.rating || 0}
                      reviews={product.reviews || 0}
                      category={product.category}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                </div>
              )}
              
              {/* Load More button can be removed or kept as dummy since we show all */}
              {filteredProducts.length > 0 && (
                <div className="mt-12 text-center">
                    <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors">
                    Load More Products
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
  );
};

export default Shop;
