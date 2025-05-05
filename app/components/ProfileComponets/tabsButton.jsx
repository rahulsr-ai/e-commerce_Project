//@ts-nocheck



import React from 'react';

const TabButton = ({ active, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        active
          ? 'bg-violet-600 text-[var(--primary-text-color)]'
          : 'bg-[var(--background-color)]-800 text-gray-200-400 hover:bg-[var(--background-color)]-700'
      }`}
    >
      {children}
    </button>
  );
};

export default TabButton;