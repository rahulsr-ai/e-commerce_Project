"use client"



import React, { useState, useEffect } from 'react';
import {
  Edit2, X, Save, Package, Search, ChevronLeft, ChevronRight,
  AlertTriangle, Download, Upload, RefreshCw, Filter
} from 'lucide-react';
import { useSidebar } from '@/helpers/SidebarContext';


// Sample data - expanded for pagination
const initialProducts = [
  { id: '1', name: 'Wireless Earbuds', sku: 'WE-001', price: 99.99, stock: 150 },
  { id: '2', name: 'Smart Watch', sku: 'SW-002', price: 199.99, stock: 75 },
  { id: '3', name: 'Laptop Pro', sku: 'LP-003', price: 1299.99, stock: 25 },
  { id: '4', name: 'Gaming Mouse', sku: 'GM-004', price: 59.99, stock: 200 },
  { id: '5', name: 'Mechanical Keyboard', sku: 'MK-005', price: 129.99, stock: 100 },
  { id: '6', name: 'USB-C Hub', sku: 'UC-006', price: 49.99, stock: 85 },
  { id: '7', name: 'Wireless Charger', sku: 'WC-007', price: 39.99, stock: 120 },
  { id: '8', name: 'Bluetooth Speaker', sku: 'BS-008', price: 89.99, stock: 45 },
  { id: '9', name: 'Webcam HD', sku: 'WH-009', price: 79.99, stock: 30 },
  { id: '10', name: 'Gaming Headset', sku: 'GH-010', price: 149.99, stock: 60 },
];

function InventoryPage() {

  const {isSidebarOpen} = useSidebar();

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [stockFilter, setStockFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const [Skeleton, setSkeleton] = useState(true);

  // Filter products based on search and stock level
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStockFilter = stockFilter === 'all' ||
      (stockFilter === 'low' && product.stock <= 20) ||
      (stockFilter === 'medium' && product.stock > 20 && product.stock <= 50) ||
      (stockFilter === 'high' && product.stock > 50);

    return matchesSearch && matchesStockFilter;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setNewStock(product.stock.toString());
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (selectedProduct && newStock) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const updatedProducts = products.map(product =>
          product.id === selectedProduct.id
            ? { ...product, stock: parseInt(newStock) }
            : product
        );
        setProducts(updatedProducts);
        
        console.log('Stock Updated:', {
          productName: selectedProduct.name,
          sku: selectedProduct.sku,
          newStock: parseInt(newStock)
        });
        
        setIsModalOpen(false);
        setSelectedProduct(null);
        setNewStock('');
      } catch (error) {
        console.error('Error updating stock:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const exportInventory = () => {
    const csvContent = [
      ['Product Name', 'SKU', 'Price', 'Stock'],
      ...products.map(product => [
        product.name,
        product.sku,
        product.price.toString(),
        product.stock.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refreshInventory = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real InventoryPage, fetch fresh data from backend
      setIsLoading(false);
    } catch (error) {
      console.error('Error refreshing inventory:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setSkeleton(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  if (Skeleton) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black border-r border-violet-800/20 p-4 sm:p-6 lg:p-8 ">
      <div className={`bg-neutral-950 rounded-lg shadow-lg overflow-hidden ${isSidebarOpen ? 'w-full' : 'ml-12'}`}>
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-violet-600">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-violet-600" />
              <h1 className="text-xl font-semibold text-white">Inventory Management</h1>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
              </div>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500
                text-black"
              >
                <option value="all">All Stock Levels</option>
                <option value="low">Low Stock</option>
                <option value="medium">Medium Stock</option>
                <option value="high">High Stock</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={refreshInventory}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white
               bg-violet-600 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportInventory}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </button>
            <button
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="h-4 w-4 mr-1" />
              Import CSV
            </button>
          </div>
        </div>

        {/* Low Stock Alert */}
        {products.some(p => p.stock <= 20) && (
          <div className="bg-yellow-50 p-4 border-b border-yellow-100">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Low Stock Alert
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Some products are running low on stock. Please review and restock as needed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-violet-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-violet-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-violet-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-violet-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-violet-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-90 divide-y divide-gray-200">
              {currentItems.map((product) => (
                <tr key={product.id} className="hover:bg-black/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-violet-200">{product.sku}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                      product.stock > 50 ? 'bg-green-600 text-white' : 
                      product.stock > 20 ? 'bg-yellow-600 text-white' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs 
                      font-medium rounded-md text-white  bg-violet-500 hover:bg-white hover:text-black focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-black px-4 py-3 flex items-center justify-between border-t border-violet-600 sm:px-6">
          <div className="flex-1 flex justify-end sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className=''>
              <p className="text-sm text-violet-600">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredProducts.length)}
                </span>{' '}
                of <span className="font-medium">{filteredProducts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Stock Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
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
    </div>
  );
}

export default InventoryPage;