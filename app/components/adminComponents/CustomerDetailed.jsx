import React from 'react';
import { X, Phone, MapPin, Calendar, ShoppingBag, DollarSign, Clock } from 'lucide-react';

import { customers } from '@/app/data/dummyData';



export function CustomerDetails({ customer, onClose }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl relative">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Customer Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-800/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{customer.fullName}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <span className={`px-3 py-1 rounded-full text-xs font-medium 
                ${customer.status === 'active' ? 'bg-green-900 text-green-300' : 
                  customer.status === 'inactive' ? 'bg-yellow-900 text-yellow-300' : 
                  'bg-red-900 text-red-300'}`}
              >
                {customer.status}
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-400 uppercase">Contact Information</h4>
              <div className="space-y-3">
                <p className="text-white">{customer.email}</p>
                <div className="flex items-center gap-2 text-white">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-400 uppercase">Address Information</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Billing Address</p>
                    <p className="text-gray-400">{customer.address.billing}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Shipping Address</p>
                    <p className="text-gray-400">{customer.address.shipping}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Member Since</span>
              </div>
              <p className="text-white font-medium">{formatDate(customer.registrationDate)}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Total Orders</span>
              </div>
              <p className="text-white font-medium">{customer.totalOrders}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Total Spent</span>
              </div>
              <p className="text-white font-medium">${customer.totalSpent.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Last Order</span>
              </div>
              <p className="text-white font-medium">{formatDate(customer.lastOrderDate)}</p>
            </div>
          </div>

          {/* Activity Timeline */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 uppercase mb-4">Recent Activity</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div>
                  <p className="text-white">Last Login</p>
                  <p className="text-sm text-gray-400">{formatDate(customer.lastLoginDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div>
                  <p className="text-white">Last Order Placed</p>
                  <p className="text-sm text-gray-400">{formatDate(customer.lastOrderDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}