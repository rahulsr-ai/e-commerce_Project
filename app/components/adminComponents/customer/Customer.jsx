"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ChevronDown,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Edit2,
  X,
  IndianRupee,
} from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";
import { updateUserOrderStatus } from "@/lib/apiCalls";

// Mock data for orders with extended information
const MOCK_ORDERS = [
  {
    id: "#ORD-2024001",
    customer: "John Doe",
    items: [
      { name: "Gaming Laptop", quantity: 1, price: 199.99 },
      { name: "Wireless Mouse", quantity: 1, price: 100.0 },
    ],
    total: 299.99,
    status: "Pending",
    date: "2024-03-15",
    customerDetails: {
      email: "john.doe@example.com",
      phone: "+1 234-567-8901",
      address: "123 Main St, New York, NY 10001",
    },
    notes: "Customer requested express shipping",
  },
  {
    id: "#ORD-2024002",
    customer: "Jane Smith",
    items: [{ name: "Mechanical Keyboard", quantity: 1, price: 149.99 }],
    total: 149.99,
    status: "Dispatched",
    date: "2024-03-14",
    customerDetails: {
      email: "jane.smith@example.com",
      phone: "+1 234-567-8902",
      address: "456 Oak Ave, Los Angeles, CA 90001",
    },
    notes: "",
  },
  {
    id: "#ORD-2024003",
    customer: "Mike Johnson",
    items: [
      { name: "Gaming Monitor", quantity: 2, price: 199.99 },
      { name: "HDMI Cable", quantity: 1, price: 100.01 },
    ],
    total: 499.99,
    status: "Delivered",
    date: "2024-03-13",
    customerDetails: {
      email: "mike.j@example.com",
      phone: "+1 234-567-8903",
      address: "789 Pine St, Chicago, IL 60601",
    },
    notes: "Leave at the front door",
  },
  {
    id: "#ORD-2024004",
    customer: "Sarah Wilson",
    items: [{ name: "Wireless Earbuds", quantity: 1, price: 99.99 }],
    total: 99.99,
    status: "Cancelled",
    date: "2024-03-12",
    customerDetails: {
      email: "sarah.w@example.com",
      phone: "+1 234-567-8904",
      address: "321 Elm St, Houston, TX 77001",
    },
    notes: "Cancelled due to payment issue",
  },
  {
    id: "#ORD-2024005",
    customer: "Tom Brown",
    items: [{ name: "Gaming Chair", quantity: 1, price: 259.99 }],
    total: 259.99,
    status: "Pending",
    date: "2024-03-11",
    customerDetails: {
      email: "tom.b@example.com",
      phone: "+1 234-567-8905",
      address: "654 Maple Ave, Seattle, WA 98101",
    },
    notes: "",
  },
  {
    id: "#ORD-2024006",
    customer: "Alex Johnson",
    items: [{ name: "Gaming Chair", quantity: 1, price: 259.99 }],
    total: 259.99,
    status: "Pending",
    date: "2024-03-11",
    customerDetails: {
      email: "alex.j@example.com",
      phone: "+1 234-567-8906",
      address: "654 Maple Ave, Seattle, WA 98101",
    },
    notes: "",
  },
  {
    id: "#ORD-2024007",
    customer: "Emily Davis",
    items: [{ name: "Gaming Chair", quantity: 1, price: 259.99 }],
    total: 259.99,
    status: "Pending",
    date: "2024-03-11",
    customerDetails: {
      email: "emily.d@example.com",
      phone: "+1 234-567-8907",
      address: "654 Maple Ave, Seattle, WA 98101",
    },
    notes: "",
  },
  {
    id: "#ORD-2024008",
    customer: "Chris Miller",
    items: [{ name: "Gaming Chair", quantity: 1, price: 259.99 }],
    total: 259.99,
    status: "Pending",
    date: "2024-03-11",
    customerDetails: {
      email: "chris.m@example.com",
      phone: "+1 234-567-8908",
      address: "654 Maple Ave, Seattle, WA 98101",
    },
    notes: "",
  },
];

const ITEMS_PER_PAGE = 5;

function Customer({ UserOrderData, setUserOrderData, FixrealData }) {
  console.log("UserOrderData --------------", UserOrderData);

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
        statusFilter === "All Status" || order.status == statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Stats calculation
  const orderStats = useMemo(() => {
    const stats = FixrealData?.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1; // Properly increment order statuses
      return acc;
    }, {});

    return [
      {
        label: "Pending Orders",
        count: stats["Pending"] || 0, // Use string keys
        icon: Package,
        color: "bg-amber-500",
      },
      {
        label: "Dispatched",
        count: stats["Dispatched"] || 0,
        icon: Truck,
        color: "bg-blue-500",
      },
      {
        label: "Delivered",
        count: stats["Delivered"] || 0,
        icon: CheckCircle,
        color: "bg-green-500",
      },
      {
        label: "Cancelled",
        count: stats["Cancelled"] || 0,
        icon: XCircle,
        color: "bg-red-500",
      },
    ];
  }, [UserOrderData]); // Dependency should be UserOrderData

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-amber-500",
      Dispatched: "bg-blue-500",
      Delivered: "bg-green-500",
      Cancelled: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const handleStatusUpdate = async (orderId) => {
    setIsEditStatusModalOpen(false);
    const response = await updateUserOrderStatus(orderId, newStatus);
    console.log("response", response);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Orders Management
                </h2>
                <p className="text-zinc-400 mt-2">
                  Manage and track all customer orders
                </p>
              </motion.div>

              {/* Order Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {orderStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-zinc-900 rounded-lg shadow-lg p-5 border border-zinc-800"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm md:text-base text-zinc-400">
                          {stat.label}
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-white mt-2">
                          {stat.count}
                        </p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-full`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Filters and Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col md:flex-row gap-4 mb-6"
              >
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders by ID or customer name..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        DisplayBySearch(e.target.value);
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900 text-white rounded-lg border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      DisplayByStatus(e.target.value);
                    }}
                    className="px-4 py-3 text-white bg-zinc-900 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none hover:bg-zinc-800 transition-colors"
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="overflow-x-auto rounded-lg border border-zinc-800"
              >
                <table className="w-full">
                  <thead className="bg-zinc-900">
                    <tr>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                        Products
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 md:px-6 py-4 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {UserOrderData.map((order, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-black hover:bg-zinc-900 transition-colors"
                      >
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          # {order.orderId.slice(5, 15)}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-white">
                          {order.userDetails.name}
                        </td>

                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                          {order.productsData.reduce(
                            (total, elem) => total + elem.quantity,
                            0
                          )}{" "}
                          items
                        </td>

                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          <IndianRupee className="inline size-4" />{" "}
                          {order.totalAmount}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              order.status
                            )} text-white`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
                          {new Date(order.createdAt).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsModalOpen(true);
                              }}
                              className="text-purple-500 hover:text-purple-400 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setEditingOrder(order);
                                setIsEditStatusModalOpen(true);
                              }}
                              className="text-purple-500 hover:text-purple-400 transition-colors"
                              title="Edit Status"
                            >
                              <Edit2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Pagination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4"
              >
                <div className="text-xs text-zinc-400">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredOrders.length
                  )}{" "}
                  of {filteredOrders.length} entries
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors border border-zinc-800"
                  >
                    Previous
                  </motion.button>
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 ${
                        currentPage === index + 1
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-zinc-900 hover:bg-zinc-800"
                      } text-white rounded-lg transition-colors border ${
                        currentPage === index + 1
                          ? "border-purple-500"
                          : "border-zinc-800"
                      }`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors border border-zinc-800"
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>

              {/* Order Details Modal */}
              <AnimatePresence>
                {isDetailsModalOpen && selectedOrder && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-zinc-900 scrollbar-hide  rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-700 shadow-xl"
                    >
                      <div className="p-6 ">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-white">
                            Order Details
                          </h3>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsDetailsModalOpen(false)}
                            className="text-zinc-400 hover:text-white transition-colors"
                          >
                            <X className="w-6 h-6" />
                          </motion.button>
                        </div>

                        {/* Order Information */}
                        <div className="space-y-8">
                          <div className="bg-zinc-800 p-5 rounded-lg">
                            <h4 className="text-lg font-semibold text-white mb-4 border-b border-zinc-700 pb-2">
                              Order Information
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <p className="text-zinc-400 text-sm">
                                  Order ID
                                </p>
                                <p className="text-white font-medium">
                                  # {selectedOrder.orderId.slice(0, 5)}
                                </p>
                              </div>
                              <div>
                                <p className="text-zinc-400 text-sm">Date</p>
                                <p className="text-white font-medium">
                                  {new Date(
                                    selectedOrder.createdAt
                                  ).toLocaleString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-zinc-400 text-sm">Status</p>
                                <span
                                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                    selectedOrder.status
                                  )} text-white mt-1`}
                                >
                                  {selectedOrder.status}
                                </span>
                              </div>
                              <div>
                                <p className="text-zinc-400 text-sm">Total</p>
                                <p className="text-white font-medium">
                                  <IndianRupee className="inline size-4" />{" "}
                                  {selectedOrder.totalAmount}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Customer Information */}
                          <div className="bg-zinc-800 p-5 rounded-lg">
                            <h4 className="text-lg font-semibold text-white mb-4 border-b border-zinc-700 pb-2">
                              Customer Information
                            </h4>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-zinc-400 text-sm">Name</p>
                                  <p className="text-white font-medium">
                                    {selectedOrder.userDetails.name}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                      handleContactCustomer(
                                        "email",
                                        selectedOrder.userDetails.email
                                      )
                                    }
                                    className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                                    title="Send Email"
                                  >
                                    <Mail className="w-5 h-5 text-white" />
                                  </motion.button>
                                </div>
                              </div>
                              <div>
                                <p className="text-zinc-400 text-sm">Email</p>
                                <p className="text-white font-medium">
                                  {selectedOrder.userDetails.email}
                                </p>
                              </div>

                              <div>
                                <p className="text-zinc-400 text-sm">Address</p>
                                <p className="text-white font-medium">
                                  {selectedOrder.shippingAddress.country},{" "}
                                  {selectedOrder.shippingAddress.city},{" "}
                                  {selectedOrder.shippingAddress.state},{" "}
                                  {selectedOrder.shippingAddress.postalCode},{" "}
                                  {selectedOrder.shippingAddress.street},{" "}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="bg-zinc-800 p-5 rounded-lg">
                            <h4 className="text-lg font-semibold text-white mb-4 border-b border-zinc-700 pb-2">
                              Order Items
                            </h4>
                            <div className="rounded-lg overflow-hidden">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-zinc-700">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                      Item
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                      Quantity
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                      Price
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedOrder.productsData.map(
                                    (item, index) => (
                                      <tr
                                        key={index}
                                        className="border-t border-zinc-700"
                                      >
                                        <td className="px-4 py-3 text-sm text-white">
                                          {item.name}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-white">
                                          {item.quantity}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-white">
                                          <IndianRupee className="inline size-4 mr-1" />
                                          {item.price.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-white font-medium">
                                          <IndianRupee className="inline size-4 mr-1" />
                                          {(item.quantity * item.price).toFixed(
                                            2
                                          )}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Notes */}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Edit Status Modal */}
              <AnimatePresence>
                {isEditStatusModalOpen && editingOrder && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-zinc-900 rounded-lg p-6 max-w-md w-full border border-zinc-700 shadow-xl"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">
                          Update Order Status
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsEditStatusModalOpen(false)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </motion.button>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <p className="text-zinc-400 mb-2">Current Status</p>
                          <span
                            className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                              editingOrder.status
                            )} text-white`}
                          >
                            {editingOrder.status}
                          </span>
                        </div>

                        <div className="bg-zinc-800 p-4 rounded-lg">
                          <p className="text-zinc-400 mb-2">New Status</p>
                          <select
                            className="w-full px-4 py-3 bg-zinc-900 text-white rounded-lg border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            defaultValue={editingOrder.status}
                            onChange={(e) => {
                              setNewStatus(e.target.value);
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsEditStatusModalOpen(false)}
                            className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700"
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleStatusUpdate(editingOrder.orderId)
                            }
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Update Status
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Customer;
