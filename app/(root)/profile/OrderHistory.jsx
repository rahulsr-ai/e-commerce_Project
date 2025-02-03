import React from 'react';
import { Package, ExternalLink } from 'lucide-react';

const demoOrders = [
  {
    id: "ORD-001",
    date: "2024-03-15",
    status: "Delivered",
    total: "$299.99",
    items: [
      { name: "Gaming Headset", quantity: 1, price: "$199.99" },
      { name: "Mouse Pad XL", quantity: 1, price: "$100.00" }
    ]
  },
  {
    id: "ORD-002",
    date: "2024-03-10",
    status: "In Transit",
    total: "$1,299.99",
    items: [
      { name: "Gaming Monitor 27\"", quantity: 1, price: "$799.99" },
      { name: "Mechanical Keyboard", quantity: 1, price: "$500.00" }
    ]
  },
  {
    id: "ORD-003",
    date: "2024-03-10",
    status: "In Transit",
    total: "$1,299.99",
    items: [
      { name: "Gaming Monitor 27\"", quantity: 1, price: "$799.99" },
      { name: "Mechanical Keyboard", quantity: 1, price: "$500.00" }
    ]
  },
  {
    id: "ORD-004",
    date: "2024-03-10",
    status: "In Transit",
    total: "$1,299.99",
    items: [
      { name: "Gaming Monitor 27\"", quantity: 1, price: "$799.99" },
      { name: "Mechanical Keyboard", quantity: 1, price: "$500.00" }
    ]
  },
  {
    id: "ORD-005",
    date: "2024-03-10",
    status: "In Transit",
    total: "$1,299.99",
    items: [
      { name: "Gaming Monitor 27\"", quantity: 1, price: "$799.99" },
      { name: "Mechanical Keyboard", quantity: 1, price: "$500.00" }
    ]
  },
  {
    id: "ORD-006",
    date: "2024-03-10",
    status: "In Transit",
    total: "$1,299.99",
    items: [
      { name: "Gaming Monitor 27\"", quantity: 1, price: "$799.99" },
      { name: "Mechanical Keyboard", quantity: 1, price: "$500.00" }
    ]
  },
  {
    id: "ORD-007",
    date: "2024-03-10",
    status: "In Transit",
    total: "$1,299.99",
    items: [
      { name: "Gaming Monitor 27\"", quantity: 1, price: "$799.99" },
      { name: "Mechanical Keyboard", quantity: 1, price: "$500.00" }
    ]
  },
  {
    id: "ORD-008",
    date: "2024-03-10",
    status: "In Transit",
    total: "$1,299.99",
    items: [
      { name: "Gaming Monitor 27\"", quantity: 1, price: "$799.99" },
      { name: "Mechanical Keyboard", quantity: 1, price: "$500.00" }
    ]
  },
  {
    id: "ORD-009",
    date: "2024-03-05",
    status: "Processing",
    total: "$159.99",
    items: [
      { name: "Gaming Mouse", quantity: 1, price: "$159.99" }
    ]
  }
];



const OrderHistory = () => {
  if (demoOrders.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-400">No orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <div className="rounded-md border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/50">
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">Order ID</th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">Date</th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">Items</th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">Total</th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">Status</th>
                <th className="px-4 py-3 text-left font-medium text-xs lg:text-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium ">{order.id}</td>
                  <td className="px-4 py-3 ">{order.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {order.items.map((item, index) => (
                        <div key={index} className=" text-zinc-300">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 ">{order.total}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' :
                      order.status === 'In Transit' ? 'bg-blue-500/20 text-blue-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                      <span className="text-sm">View Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
