import { cartService } from '../services/cartService';

const DebugPanel = () => {
  const handleClearData = () => {
    cartService.clearAllData();
    window.location.reload();
  };

  const handleShowProductCount = () => {
    const products = cartService.getAllProducts();
    alert(`Total products: ${products.length}`);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm z-50">
      <div className="flex flex-col gap-2">
        <button 
          onClick={handleShowProductCount}
          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
        >
          Check Product Count
        </button>
        <button 
          onClick={handleClearData}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default DebugPanel;
