import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { cartService } from '../services/cartService';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero'; // Assuming Hero component is needed based on the original code

const Home = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchProducts = () => {
      try {
        const productsData = cartService.getAllProducts();
        setProducts(productsData);
      } catch (err) {
        console.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get filtered products - if search exists, check all products, else show first 6
  let displayProducts = products;
  
  if (searchQuery) {
     displayProducts = products.filter(product => {
        const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;
        return product.title.toLowerCase().includes(searchQuery) ||
               (categoryName && categoryName.toString().toLowerCase().includes(searchQuery));
     });
  } else {
     displayProducts = products.slice(0, 6);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-indigo-600 animate-pulse text-2xl">Digital Shop Loading...</div>;

  return (
    <main className="pb-12">
        <Hero />
        
        <Categories />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
            </h2>
            
            {displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {displayProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            rating={product.rating}
                            reviews={product.reviews}
                            category={product.category}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-lg">No products found matching your search.</p>
                    <Link to="/shop" className="text-indigo-600 hover:underline mt-2 inline-block">Browse all products</Link>
                </div>
            )}

            {!searchQuery && (
                <div className="mt-12 text-center">
                    <Link 
                        to="/shop" 
                        className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors shadow-sm"
                    >
                        View More Products
                    </Link>
                </div>
            )}
        </div>
      </main>
  );
};

export default Home;
