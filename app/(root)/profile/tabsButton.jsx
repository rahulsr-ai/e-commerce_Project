//@ts-nocheck



import React from 'react';

const TabButton = ({ active, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        active
          ? 'bg-indigo-600 text-white'
          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
      }`}
    >
      {children}
    </button>
  );
};

export default TabButton;