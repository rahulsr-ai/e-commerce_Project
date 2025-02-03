import React from 'react';
import { User, ShoppingBag, Calendar, Activity, Ban, Clock } from 'lucide-react';
import { customers } from '@/app/data/dummyData';


export function CustomerCard({ customer, onViewDetails }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'banned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-lg">{customer.fullName}</h3>
            <p className="text-gray-600 text-sm">{customer.email}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(customer.status)}`}>
          {customer.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <ShoppingBag className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm">
            Orders: <strong>{customer.totalOrders}</strong>
          </span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm">
            Joined: <strong>{new Date(customer.registrationDate).toLocaleDateString()}</strong>
          </span>
        </div>
        <div className="flex items-center">
          <Activity className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm">
            Spent: <strong>${customer.totalSpent.toFixed(2)}</strong>
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm">
            Last Order: <strong>{new Date(customer.lastOrderDate).toLocaleDateString()}</strong>
          </span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(customer.id)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        View Details
      </button>
    </div>
  );
}