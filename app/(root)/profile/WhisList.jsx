import React from 'react';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
      <div className="flex flex-col items-center justify-center py-12">
        <Heart className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-gray-400">Your wishlist is empty</p>
      </div>
    </div>
  );
};

export default Wishlist;