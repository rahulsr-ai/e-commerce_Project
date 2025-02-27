import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentMethods = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
      <div className="flex flex-col items-center justify-center py-12">
        <CreditCard className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-400">No payment methods added</p>
      </div>
    </div>
  );
};

export default PaymentMethods;