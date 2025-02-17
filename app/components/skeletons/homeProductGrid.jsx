import React from "react";

const HomeProductGrid = () => {
  return (
    <div className="relative animate-pulse">
      <div className="flex flex-col items-center mb-6">
        <div className="flex lg:flex-row flex-col gap-4 justify-between items-center mb-4 z-20">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="fixed inset-0 bg-gray-200 z-50 flex items-center justify-center">
          <div className="h-96 bg-gray-100 p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1 px-4 h-10 bg-gray-200 rounded"></div>
              <div className="flex-1 px-4 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="group bg-gray-200 rounded-lg overflow-hidden md:static my-7 md:my-0">
          <div className="relative overflow-hidden">
            <div className="w-full h-64 bg-gray-300"></div>
            <div className="absolute top-4 right-4 space-y-2">
              <div className="bg-gray-200 p-2 rounded-full text-white"></div>
            </div>
          </div>
          <div className="py-2 px-2 flex flex-col justify-between">
            <div className="text-sm bg-gray-200 rounded w-1/4 mb-1"></div>
            <div className="text-lg bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="font-medium bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="flex space-x-2">
              <div className="flex-1 bg-gray-200 rounded h-10"></div>
              <div className="bg-gray-200 rounded h-10 w-14"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProductGrid;
