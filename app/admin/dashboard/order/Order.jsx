"use client";

import React, { useState, useMemo, useEffect } from "react";
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
} from "lucide-react";

import { useSidebar } from "@/helpers/SidebarContext";

// Mock data for orders with extended information
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
];

const ITEMS_PER_PAGE = 5;

function OrderPage() {
  const { isSidebarOpen } = useSidebar();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderNotes, setOrderNotes] = useState("");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter orders based on search query and status
  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || order.status === statusFilter;
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
    const stats = MOCK_ORDERS.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    return [
      {
        label: "Pending Orders",
        count: stats.Pending || 0,
        icon: Package,
        color: "bg-yellow-600",
      },
      {
        label: "Dispatched",
        count: stats.Dispatched || 0,
        icon: Truck,
        color: "bg-blue-600",
      },
      {
        label: "Delivered",
        count: stats.Delivered || 0,
        icon: CheckCircle,
        color: "bg-green-600",
      },
      {
        label: "Cancelled",
        count: stats.Cancelled || 0,
        icon: XCircle,
        color: "bg-red-600",
      },
    ];
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-600",
      Dispatched: "bg-blue-600",
      Delivered: "bg-green-600",
      Cancelled: "bg-red-600",
    };
    return colors[status] || "bg-gray-600";
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    // In a real application, this would make an API call
    const updatedOrders = MOCK_ORDERS.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    // Update the mock data
    MOCK_ORDERS.splice(0, MOCK_ORDERS.length, ...updatedOrders);
    setIsEditStatusModalOpen(false);
    setEditingOrder(null);
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
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <main className={`transition-all duration-300 ${isSidebarOpen ? "" : "ml-16"}`}>
        <div className="border border-violet-800/20">
          <div className="w-full pt-5">
            <main className="p-4 md:p-6">
              {/* Page Title */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Order Management
                </h2>
                <p className="text-gray-400 mt-2">
                  Manage and track all customer orders
                </p>
              </div>

              {/* Order Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {orderStats.map((stat, index) => (
                  <div
                    key={index}
                    className="shadow-md border-violet-500 border-2 hover:scale-95 transition-all duration-200 ease-linear rounded-lg p-4 md:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm md:text-base text-gray-400">{stat.label}</p>
                        <p className="text-xl md:text-2xl font-bold text-white mt-2">
                          {stat.count}
                        </p>
                      </div>
                      <div className={`${stat.color} p-2 md:p-3 rounded-lg`}>
                        <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-white hover:text-black text-white rounded-lg bg-violet-600">
                    <Filter className="w-5 h-5" />
                    <span className="hidden sm:inline">Filters</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 text-white bg-violet-700 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none hover:bg-white hover:text-black"
                  >
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Dispatched</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-violet-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-violet-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-violet-400 uppercase tracking-wider">
                        Products
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-violet-400 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-violet-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-violet-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-violet-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {paginatedOrders.map((order, index) => (
                      <tr key={index} className="bg-neutral-950 hover:bg-gray-800">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-white">
                          {order.id}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-white">
                          {order.customer}
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-white">
                          {order.items.length} items
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-white">
                          ${order.total}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${getStatusColor(
                              order.status
                            )} text-white`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-white">
                          {order.date}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsModalOpen(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-500"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingOrder(order);
                                setIsEditStatusModalOpen(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-500"
                              title="Edit Status"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <div className="text-xs text-gray-400">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)}{" "}
                  of {filteredOrders.length} entries
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 md:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 md:px-4 py-2 ${
                        currentPage === index + 1 ? "bg-indigo-600" : "bg-gray-900"
                      } text-white rounded-lg hover:bg-gray-800`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 md:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Order Details Modal */}
              {isDetailsModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-neutral-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">
                          Order Details
                        </h3>
                        <button
                          onClick={() => setIsDetailsModalOpen(false)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      {/* Order Information */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            Order Information
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-400">Order ID</p>
                              <p className="text-white">{selectedOrder.id}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Date</p>
                              <p className="text-white">{selectedOrder.date}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Status</p>
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  selectedOrder.status
                                )} text-white`}
                              >
                                {selectedOrder.status}
                              </span>
                            </div>
                            <div>
                              <p className="text-gray-400">Total</p>
                              <p className="text-white">${selectedOrder.total}</p>
                            </div>
                          </div>
                        </div>

                        {/* Customer Information */}
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            Customer Information
                          </h4>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-400">Name</p>
                                <p className="text-white">
                                  {selectedOrder.customer}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleContactCustomer(
                                      "email",
                                      selectedOrder.customerDetails.email
                                    )
                                  }
                                  className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                                  title="Send Email"
                                >
                                  <Mail className="w-5 h-5 text-white" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleContactCustomer(
                                      "phone",
                                      selectedOrder.customerDetails.phone
                                    )
                                  }
                                  className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                                  title="Call Customer"
                                >
                                  <Phone className="w-5 h-5 text-white" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-400">Email</p>
                              <p className="text-white">
                                {selectedOrder.customerDetails.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Phone</p>
                              <p className="text-white">
                                {selectedOrder.customerDetails.phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Address</p>
                              <p className="text-white">
                                {selectedOrder.customerDetails.address}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            Order Items
                          </h4>
                          <div className="bg-gray-800 rounded-lg overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-700">
                                  <th className="px-4 py-2 text-left text-white">
                                    Item
                                  </th>
                                  <th className="px-4 py-2 text-left text-white">
                                    Quantity
                                  </th>
                                  <th className="px-4 py-2 text-left text-white">
                                    Price
                                  </th>
                                  <th className="px-4 py-2 text-left text-white">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedOrder.items.map((item, index) => (
                                  <tr
                                    key={index}
                                    className="border-t border-gray-700"
                                  >
                                    <td className="px-4 py-2 text-white">
                                      {item.name}
                                    </td>
                                    <td className="px-4 py-2 text-white">
                                      {item.quantity}
                                    </td>
                                    <td className="px-4 py-2 text-white">
                                      ${item.price}
                                    </td>
                                    <td className="px-4 py-2 text-white">
                                      ${item.quantity * item.price}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Notes */}
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            Notes
                          </h4>
                          <textarea
                            value={orderNotes}
                            onChange={(e) => setOrderNotes(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                            rows={3}
                            placeholder="Add notes about this order..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Status Modal */}
              {isEditStatusModalOpen && editingOrder && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-neutral-900 rounded-lg p-6 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Update Order Status
                      </h3>
                      <button
                        onClick={() => setIsEditStatusModalOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 mb-2">Current Status</p>
                        <span
                          className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                            editingOrder.status
                          )} text-white`}
                        >
                          {editingOrder.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-gray-400 mb-2">New Status</p>
                        <select
                          className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                          defaultValue={editingOrder.status}
                          onChange={(e) =>
                            handleStatusUpdate(editingOrder.id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          onClick={() => setIsEditStatusModalOpen(false)}
                          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              editingOrder.id,
                              editingOrder.status
                            )
                          }
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderPage;