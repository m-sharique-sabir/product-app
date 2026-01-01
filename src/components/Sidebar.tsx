import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

// User preferences service for localStorage persistence
class UserPreferencesService {
  private readonly SEARCH_HISTORY_KEY = 'search_history';
  private readonly FILTER_PREFERENCES_KEY = 'filter_preferences';
  private readonly THEME_PREFERENCES_KEY = 'theme_preferences';

  // Search History
  getSearchHistory(): string[] {
    const history = localStorage.getItem(this.SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  }

  addToSearchHistory(query: string): void {
    if (!query.trim()) return;
    
    const history = this.getSearchHistory();
    const updatedHistory = [query, ...history.filter(item => item !== query)].slice(0, 10);
    localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
  }

  clearSearchHistory(): void {
    localStorage.removeItem(this.SEARCH_HISTORY_KEY);
  }

  // Filter Preferences
  getFilterPreferences(): any {
    const preferences = localStorage.getItem(this.FILTER_PREFERENCES_KEY);
    return preferences ? JSON.parse(preferences) : {
      selectedCategories: [],
      selectedPriceRanges: [],
      selectedRatings: [],
      sortBy: 'default'
    };
  }

  saveFilterPreferences(preferences: any): void {
    localStorage.setItem(this.FILTER_PREFERENCES_KEY, JSON.stringify(preferences));
  }

  // Theme Preferences (already handled by ThemeContext but for backup)
  getThemePreference(): string | null {
    return localStorage.getItem(this.THEME_PREFERENCES_KEY);
  }

  saveThemePreference(theme: string): void {
    localStorage.setItem(this.THEME_PREFERENCES_KEY, theme);
  }
}

export const userPreferencesService = new UserPreferencesService();

// 1. Data Structure: Filter Options
export const FILTER_OPTIONS = {
  categories: [
    { id: 'electronics', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'home', label: 'Home & Garden' },
    { id: 'sports', label: 'Sports' },
    { id: 'books', label: 'Books' },
    { id: 'beauty', label: 'Beauty' },
  ],
  priceRanges: [
    { id: 'under-50', label: 'Under $50', min: 0, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100-500', label: '$100 - $500', min: 100, max: 500 },
    { id: 'above-500', label: 'Above $500', min: 500, max: Infinity },
  ],
  ratings: [
    { id: '4-up', label: '4 Stars & up', value: 4 },
    { id: '3-up', label: '3 Stars & up', value: 3 },
    { id: '2-up', label: '2 Stars & up', value: 2 },
  ],
};

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: React.Dispatch<React.SetStateAction<string[]>>;
  selectedRatings: string[];
  setSelectedRatings: React.Dispatch<React.SetStateAction<string[]>>;
  onApplyFilters?: () => void;
  dynamicCategories?: any[];
}

const Sidebar = ({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  selectedPriceRanges,
  setSelectedPriceRanges,
  selectedRatings,
  setSelectedRatings,
  dynamicCategories = []
}: SidebarProps) => {

  // Handle Category Changes
  const handleCategoryChange = (categoryName: string) => {
    const id = categoryName.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((name) => name !== id)
        : [...prev, id]
    );
  };

  // Handle Price Range Changes
  const handlePriceChange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId]
    );
  };

    // Handle Rating Changes
  const handleRatingChange = (ratingId: string) => {
    setSelectedRatings((prev) =>
      prev.includes(ratingId)
        ? prev.filter((id) => id !== ratingId)
        : [...prev, ratingId]
    );
  };

  // Clear All Filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Filters
        </h3>
        <button 
          onClick={clearFilters}
          className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Clear
        </button>
      </div>

      <div className="space-y-8">
        {/* Search */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Refine Results</label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to filter..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        {/* 2. Dynamic Rendering: Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Categories</h4>
          <div className="space-y-2">
            {dynamicCategories.length > 0 ? dynamicCategories.map((category) => (
              <label key={category._id} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name.toLowerCase())}
                  onChange={() => handleCategoryChange(category.name)}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 transition duration-150 ease-in-out"
                />
                <span className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {category.name}
                </span>
              </label>
            )) : (
                <p className="text-xs text-gray-400 dark:text-gray-500 italic">No categories</p>
            )}
          </div>
        </div>

        {/* Dynamic Rendering: Price Ranges */}
        <div>
           <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider">Price</h4>
           </div>
           <div className="space-y-2">
            {FILTER_OPTIONS.priceRanges.map((range) => (
              <label key={range.id} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range.id)}
                  onChange={() => handlePriceChange(range.id)}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 transition duration-150 ease-in-out"
                />
                 <span className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {range.label}
                </span>
              </label>
             ))}
           </div>
        </div>

        {/* Dynamic Rendering: Ratings */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">Ratings</h4>
          <div className="space-y-2">
            {FILTER_OPTIONS.ratings.map((rating) => (
               <label key={rating.id} className="flex items-center space-x-3 cursor-pointer group">
                 <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating.id)}
                  onChange={() => handleRatingChange(rating.id)}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 transition duration-150 ease-in-out"
                />
                <span className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {rating.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
