import React from 'react';
import { Ban, UserCheck, UserX, Mail, Trash2, X } from 'lucide-react';
import { customers } from '@/app/data/dummyData';


export function ActionMenu({ customer, onClose, onAction }) {
  const actions = [
    {
      id: 'activate',
      label: 'Activate Account',
      icon: UserCheck,
      color: 'text-green-400 hover:text-green-300',
      bgHover: 'hover:bg-green-900/50',
      show: customer.status !== 'active'
    },
    {
      id: 'deactivate',
      label: 'Deactivate Account',
      icon: UserX,
      color: 'text-yellow-400 hover:text-yellow-300',
      bgHover: 'hover:bg-yellow-900/50',
      show: customer.status === 'active'
    },
    {
      id: 'ban',
      label: 'Ban Account',
      icon: Ban,
      color: 'text-red-400 hover:text-red-300',
      bgHover: 'hover:bg-red-900/50',
      show: customer.status !== 'banned'
    },
    {
      id: 'email',
      label: 'Send Email',
      icon: Mail,
      color: 'text-blue-400 hover:text-blue-300',
      bgHover: 'hover:bg-blue-900/50',
      show: true
    },
    {
      id: 'delete',
      label: 'Delete Account',
      icon: Trash2,
      color: 'text-red-400 hover:text-red-300',
      bgHover: 'hover:bg-red-900/50',
      show: true
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md relative">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Customer Actions</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-800/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-white font-medium">{customer.fullName}</h3>
            <p className="text-gray-400 text-sm">{customer.email}</p>
          </div>
          
          <div className="space-y-2">
            {actions.filter(action => action.show).map(action => (
              <button
                key={action.id}
                onClick={() => onAction(action.id, customer.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md ${action.color} ${action.bgHover} transition-colors text-left`}
              >
                <action.icon className="w-5 h-5" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}