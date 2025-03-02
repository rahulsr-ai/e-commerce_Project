"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";

const OrderStats = ({ orderData }) => {
  // Stats calculation
  const orderStats = useMemo(() => {
    const stats = orderData?.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return [
      {
        label: "Pending Orders",
        count: stats["Pending"] || 0,
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
  }, [orderData]);

  return (
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
  );
};

export default OrderStats;