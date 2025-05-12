"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, IndianRupee } from "lucide-react";

// Helper function for status colors
export const getStatusColor = (status) => {
  const colors = {
    Pending: "bg-amber-500",
    Dispatched: "bg-blue-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };
  return colors[status] || "bg-gray-500";
};

export const OrderDetailsModal = ({ 
  isOpen, 
  onClose, 
  order, 
  handleContactCustomer 
}) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[var(--background-color)] bg-opacity-80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[var(--background-color)]-900 scrollbar-hide rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-700 shadow-xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[var(--primary-text-color)]">
                  Order Details
                </h3>
                <motion.button
                 aria-label="Close details modal"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-200-400 hover:text-[var(--primary-text-color)] transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Order Information */}
              <div className="space-y-8">
                <div className="bg-[var(--background-color)]-800 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold text-[var(--primary-text-color)] mb-4 border-b border-zinc-700 pb-2">
                    Order Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-200-400 text-sm">Order ID</p>
                      <p className="text-[var(--primary-text-color)] font-medium">
                        # {order.orderId.slice(0, 5)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-200-400 text-sm">Date</p>
                      <p className="text-[var(--primary-text-color)] font-medium">
                        {new Date(order.createdAt).toLocaleString("en-US", {
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
                      <p className="text-gray-200-400 text-sm">Status</p>
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )} text-[var(--primary-text-color)] mt-1`}
                      >
                        {order?.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-200-400 text-sm">Total</p>
                      <p className="text-[var(--primary-text-color)] font-medium">
                        <IndianRupee className="inline size-4" />{" "}
                        {order?.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="bg-[var(--background-color)]-800 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold text-[var(--primary-text-color)] mb-4 border-b border-zinc-700 pb-2">
                    Customer Information
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-200-400 text-sm">Name</p>
                        <p className="text-[var(--primary-text-color)] font-medium">
                          {order?.userDetails?.name}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                         aria-label="Send email"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            handleContactCustomer(
                              "email",
                              order?.userDetails?.email
                            )
                          }
                          className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-5 h-5 text-[var(--primary-text-color)]" />
                        </motion.button>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-200-400 text-sm">Email</p>
                      <p className="text-[var(--primary-text-color)] font-medium">
                        {order?.userDetails?.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-200-400 text-sm">Address</p>
                      <p className="text-[var(--primary-text-color)] font-medium">
                        {order?.shippingAddress?.country},{" "}
                        {order?.shippingAddress?.city},{" "}
                        {order?.shippingAddress?.state},{" "}
                        {order?.shippingAddress?.postalCode},{" "}
                        {order?.shippingAddress?.street}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-[var(--background-color)]-800 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold text-[var(--primary-text-color)] mb-4 border-b border-zinc-700 pb-2">
                    Order Items
                  </h4>
                  <div className="rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[var(--background-color)]-700">
                          <th className="px-4 py-3 text-left text-xs font-medium text-[var(--primary-text-color)] uppercase tracking-wider">
                            Item
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[var(--primary-text-color)] uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[var(--primary-text-color)] uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[var(--primary-text-color)] uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.productsData.map(
                          (item, index) => (
                            <tr
                              key={index}
                              className="border-t border-zinc-700"
                            >
                              <td className="px-4 py-3 text-sm text-[var(--primary-text-color)]">
                                {item.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-[var(--primary-text-color)]">
                                {item.quantity}
                              </td>
                              <td className="px-4 py-3 text-sm text-[var(--primary-text-color)]">
                                <IndianRupee className="inline size-4 mr-1" />
                                {item.price.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-sm text-[var(--primary-text-color)] font-medium">
                                <IndianRupee className="inline size-4 mr-1" />
                                {(item.quantity * item.price).toFixed(2)}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const EditStatusModal = ({ 
  isOpen, 
  onClose, 
  order, 
  newStatus, 
  setNewStatus, 
  handleStatusUpdate 
}) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[var(--background-color)] bg-opacity-80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[var(--background-color)]-900 rounded-lg p-6 max-w-md w-full border border-zinc-700 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[var(--primary-text-color)]">
                Update Order Status
              </h3>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-200-400 hover:text-[var(--primary-text-color)] transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--background-color)]-800 p-4 rounded-lg">
                <p className="text-gray-200-400 mb-2">Current Status</p>
                <span
                  className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
                    order.status
                  )} text-[var(--primary-text-color)]`}
                >
                  {order.status}
                </span>
              </div>

              <div className="bg-[var(--background-color)]-800 p-4 rounded-lg">
                <p className="text-gray-200-400 mb-2">New Status</p>
                <select
                  className="w-full px-4 py-3 bg-[var(--background-color)] text-[var(--primary-text-color)] rounded-lg border border-zinc-700 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                  defaultValue={order.status}
                  onChange={(e) => setNewStatus(e.target.value)}
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
                  onClick={onClose}
                  className="px-4 py-2 bg-[var(--background-color)]-800 text-[var(--primary-text-color)] rounded-lg hover:bg-[var(--background-color)]-700 transition-colors border border-zinc-700"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStatusUpdate(order.orderId)}
                  className="px-4 py-2 bg-purple-600 text-[var(--primary-text-color)] rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Update Status
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};