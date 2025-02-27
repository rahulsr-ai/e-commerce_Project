import { UpdateProductStock } from "@/lib/apiCalls";
import { RefreshCw, Save, X } from "lucide-react";
import React from "react";

const EditStockModel = ({
  isModalOpen,
  setIsModalOpen,
  selectedProduct,
  setSelectedProduct,
  newStock,
  setNewStock,
  isLoading,
  setIsLoading,
  products,
  setProducts,
  productID,
}) => {
  const handleSave = async () => {
    if (selectedProduct && newStock) {
      setIsLoading(true);
      try {
        // Simulate API call
        const response = await UpdateProductStock(productID, newStock);
        console.log("response", response);

        const updatedProducts = products.map((product) =>
          product._id === selectedProduct._id
            ? { ...product, stock: parseInt(newStock) }
            : product
        );
        setProducts(updatedProducts);

        console.log("Stock Updated:", {
          productName: selectedProduct.name,
          sku: selectedProduct.sku,
          newStock: parseInt(newStock),
        });

        setIsModalOpen(false);
        setSelectedProduct(null);
        setNewStock("");
      } catch (error) {
        console.error("Error updating stock:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-black/90 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-white">
                        Edit Stock Level
                      </h3>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm  font-medium text-white">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.name}
                          disabled
                          className="mt-1 block w-full px-2 py-2 text-black rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white">
                          Current Stock
                        </label>
                        <input
                          type="number"
                          value={newStock}
                          onChange={(e) => setNewStock(e.target.value)}
                          min="0"
                          className="mt-1 block w-full rounded-md px-2 py-2 text-black border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-950 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-violet-700 text-base font-medium hover:text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditStockModel;