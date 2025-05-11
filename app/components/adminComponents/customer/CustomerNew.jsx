"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";
import { updateUserOrderStatus } from "@/lib/apiCalls";

// Import components
import OrderStats from "./OrderStats";
import OrderTable from "./OrderTable";
import { OrderDetailsModal, EditStatusModal } from "./OrderModel";

const ITEMS_PER_PAGE = 5;

function Customer({ UserOrderData, setUserOrderData, FixrealData }) {
  const { isSidebarOpen } = useSidebar();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const DisplayByStatus = (status) => {
    const filteredOrders = FixrealData.filter(
      (order) => status === "All Status" || order.status === status
    );
    setUserOrderData(filteredOrders);
  };

  // Filter orders based on search query and status
  const filteredOrders = useMemo(() => {
    return UserOrderData.filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.userDetails.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [UserOrderData, searchQuery, statusFilter]);
  

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusUpdate = async (orderId) => {
    setIsEditStatusModalOpen(false);
    
    try {
      const response = await updateUserOrderStatus(orderId, newStatus);
      
      if (response.success) {
        // Update both data sources with the new status
        const updatedUserOrderData = UserOrderData.map(order => 
          order.orderId === orderId ? { ...order, status: newStatus } : order
        );
        
        const updatedFixrealData = FixrealData.map(order => 
          order.orderId === orderId ? { ...order, status: newStatus } : order
        );
        
        // Update state with the new data
        setUserOrderData(updatedUserOrderData);
        
        // Update the selected order if it's the one being edited
        if (selectedOrder && selectedOrder.orderId === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
        
        // Show a success message (you could add a toast notification here)
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      // Show an error message (you could add a toast notification here)
    }
  };

  const DisplayBySearch = (searchQuery) => {
    const searchResults = FixrealData.filter((order) => {
      return (
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.userDetails.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setUserOrderData(searchResults);
  };

  const handleContactCustomer = (method, contact) => {
    if (method === "email") {
      window.location.href = `mailto:${contact}`;
    } else if (method === "phone") {
      window.location.href = `tel:${contact}`;
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleEditStatus = (order) => {
    setEditingOrder(order);
    setNewStatus(order.status); // Initialize with current status
    setIsEditStatusModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-color)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--primary-text-color)]">
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "" : "ml-16"
        }`}
      >
        <div className="border-zinc-800 border rounded-lg m-4">
          <div className="w-full pt-5">
            <main className="p-4 md:p-6">
              {/* Page Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-text-color)]">
                  Orders Management
                </h2>
                <p className="text-gray-200-400 mt-2">
                  Manage and track all customer orders
                </p>
              </motion.div>

              {/* Order Stats */}
              <OrderStats orderData={FixrealData} />

              {/* Filters and Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col md:flex-row gap-4 mb-6"
              >
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders by ID or customer name..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        DisplayBySearch(e.target.value);
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-[var(--background-color)] text-[var(--primary-text-color)] rounded-lg border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <select
                   aria-label="Filter by status"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      DisplayByStatus(e.target.value);
                    }}
                    className="px-4 py-3 text-[var(--primary-text-color)] bg-[var(--background-color)] border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none hover:bg-[var(--background-color)]-800 transition-colors"
                  >
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Dispatched</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </motion.div>

              {/* Orders Table */}
              <OrderTable 
                orders={UserOrderData} 
                onViewDetails={handleViewDetails}
                onEditStatus={handleEditStatus}
              />

              {/* Pagination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4"
              >
                <div className="text-xs text-gray-200-400">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredOrders.length
                  )}{" "}
                  of {filteredOrders.length} entries
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <motion.button
                   aria-label="Previous page"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[var(--background-color)]-900 text-[var(--primary-text-color)] rounded-lg hover:bg-[var(--background-color)]-800 disabled:opacity-50 transition-colors border border-zinc-800"
                  >
                    Previous
                  </motion.button>
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.button
                     aria-label="Go to page"
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 ${
                        currentPage === index + 1
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-[var(--background-color)]-900 hover:bg-[var(--background-color)]-800"
                      } text-[var(--primary-text-color)] rounded-lg transition-colors border ${
                        currentPage === index + 1
                          ? "border-purple-500"
                          : "border-zinc-800"
                      }`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                  <motion.button
                   aria-label="Next page"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-[var(--background-color)]-900 text-[var(--primary-text-color)] rounded-lg hover:bg-[var(--background-color)]-800 disabled:opacity-50 transition-colors border border-zinc-800"
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>

              {/* Modals */}
              <OrderDetailsModal 
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                order={selectedOrder}
                handleContactCustomer={handleContactCustomer}
              />
              
              <EditStatusModal 
                isOpen={isEditStatusModalOpen}
                onClose={() => setIsEditStatusModalOpen(false)}
                order={editingOrder}
                newStatus={newStatus}
                setNewStatus={setNewStatus}
                handleStatusUpdate={handleStatusUpdate}
              />
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Customer;