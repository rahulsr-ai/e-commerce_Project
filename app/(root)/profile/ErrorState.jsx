//@ts-nocheck

import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <h3 className="text-xl font-semibold text-white">{message}</h3>
    </div>
  );
};

export default ErrorState;