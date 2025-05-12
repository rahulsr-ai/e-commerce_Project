"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Edit2, IndianRupee } from "lucide-react";
import { getStatusColor } from "./OrderModel";

const OrderTable = ({ 
  orders, 
  onViewDetails, 
  onEditStatus 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="overflow-x-auto rounded-lg border border-zinc-800"
    >
      <table className="w-full">
        <thead className="bg-[var(--background-color)]-900">
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
          {orders.map((order, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[var(--background-color)] hover:bg-[var(--background-color)]-900 transition-colors"
            >
              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--primary-text-color)]">
                # {order.orderId.slice(5, 15)}
              </td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-[var(--primary-text-color)]">
                {order.userDetails?.name}
              </td>

              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-200-300">
                {order.productsData.reduce(
                  (total, elem) => total + elem.quantity,
                  0
                )}{" "}
                items
              </td>

              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--primary-text-color)]">
                <IndianRupee className="inline size-4" />{" "}
                {order.totalAmount}
              </td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    order.status
                  )} text-[var(--primary-text-color)]`}
                >
                  {order.status}
                </span>
              </td>
              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-200-300">
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
                   aria-label="View details"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onViewDetails(order)}
                    className="text-purple-500 hover:text-purple-400 transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                   aria-label="Edit status"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEditStatus(order)}
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
  );
};

export default OrderTable;