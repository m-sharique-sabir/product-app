import { Tag } from 'lucide-react';

const Categories = () => {
  // Static categories data
  const categories = [
    { id: 1, name: 'watch' },
    { id: 2, name: 'laptops' },
    { id: 3, name: 'mobile' },
    { id: 4, name: 'headphones' },
    { id: 5, name: 'speakers' },
    { id: 6, name: 'tablets' }
  ];

  const colors = [
    'bg-blue-100 text-blue-600',
    'bg-pink-100 text-pink-600',
    'bg-green-100 text-green-600',
    'bg-orange-100 text-orange-600',
    'bg-purple-100 text-purple-600',
    'bg-teal-100 text-teal-600'
  ];

  
  return (
    <section className="py-12 bg-gray-50/50 dark:bg-gray-800/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shop by Category</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Explore our wide range of products across top categories</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-500 transition-all cursor-pointer group flex flex-col items-center justify-center text-center py-8"
            >
              <div className={`p-4 rounded-full mb-4 ${colors[index % colors.length]} group-hover:scale-110 transition-transform duration-300`}>
                <Tag className="h-8 w-8" />
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
