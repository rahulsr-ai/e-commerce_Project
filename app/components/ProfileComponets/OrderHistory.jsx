import React, { useState } from "react";
import { Package, ExternalLink, IndianRupee } from "lucide-react";
import CustomizeModel from "../CustomizeMode";
import Loader from "../useComponents/Loader";

const OrderHistory = ({ orders }) => {


  if (orders.length === 0) {
    return <Loader />;
  }


  if (!orders) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="w-12 h-12 text-gray-200-400 mb-4" />
          <p className="text-gray-200-400">No orders yet</p>
        </div>
      </div>
    );
  }


  
  const [isOpen, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // State to store the selected address

  const handleViewAddress = (address) => {
    setSelectedAddress(address); // Set the selected address
    setOpen(true); // Open the modal
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <div className="rounded-md border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--background-color)]-900/50">
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">
                  Items
                </th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">
                  Total
                </th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const formattedDate = new Date(order.createdAt).toLocaleString(
                  "en-US",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                );

                return (
                  <tr
                    key={order.orderId}
                    className="border-b border-zinc-800 hover:bg-[var(--background-color)]-900/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">
                      #{order.orderId.slice(0, 5)}
                    </td>
                    <td className="px-4 py-3">{formattedDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {order.products.map((item, index) => (
                          <div key={index} className="text-gray-200-300">
                            {item.quantity}x {item.name}{" "}
                            {/* Product name needed */}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <IndianRupee className="text-gray-200-300 inline size-4" />
                      {order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-500/20 text-green-500"
                            : order.status === "In Transit"
                            ? "bg-blue-500/20 text-blue-500"
                            : order.status === "Cancelled"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleViewAddress(order.shippingAddress)}
                        className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <span className="text-sm">View Address</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CustomizeModel Component */}
      <CustomizeModel
        isOpen={isOpen}
        setisOpen={setOpen}
        shippingAddress={selectedAddress}
      />
    </div>
  );
};

export default OrderHistory;
