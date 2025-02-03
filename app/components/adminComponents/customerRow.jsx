import React from 'react';
import { Eye } from 'lucide-react';
import { customers } from '@/app/data/dummyData';

export function CustomerRow({ customer, onViewDetails }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-900 text-green-300';
      case 'inactive':
        return 'bg-yellow-900 text-yellow-300';
      case 'banned':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <tr className="hover:bg-gray-800/50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-white">{customer.fullName}</div>
            <div className="text-sm text-gray-400">{customer.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
          {customer.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white">{customer.totalOrders}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white">${customer.totalSpent.toFixed(2)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white">{new Date(customer.lastOrderDate).toLocaleDateString()}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={() => onViewDetails(customer.id)}
          className="text-purple-400 hover:text-purple-300 p-2 rounded-full hover:bg-purple-900/50 transition-colors"
        >
          <Eye className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}