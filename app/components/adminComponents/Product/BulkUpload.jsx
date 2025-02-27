"use client";

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Upload,
  X,
  AlertCircle,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';

const BulkUpload = () => {
  const [csvFile, setCsvFile] = useState(null);

  const handleCsvUpload = (e) => {
    if (e.target.files?.[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const ProcessCsvUplaod = () => {
    toast.success("CSV file uploaded successfully!");
    setCsvFile(null);
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-black border-r border-violet-800/20 p-6 rounded-lg border border-gray-200">
          <div className="text-center mb-6">
            <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-white">
              Bulk Product Upload
            </h3>
            <p className="mt-1 text-sm text-violet-500">
              Upload a CSV file containing multiple products
            </p>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-white">
              Choose CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
            />
          </div>

          {csvFile && (
            <div className="mt-6">
              <div className="flex items-center space-x-2 text-sm text-white">
                <Check className="h-5 w-5 text-green-500" />
                <span>File selected: {csvFile.name}</span>
                <button
                  onClick={() => setCsvFile(null)}
                  className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={ProcessCsvUplaod}
                type="button"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                <Upload className="h-4 w-4 mr-2" />
                Process CSV File
              </button>
            </div>
          )}

          <div className="mt-6">
            <div className="rounded-md bg-violet-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-violet-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-violet-800">
                    CSV Format Guidelines
                  </h3>
                  <div className="mt-2 text-sm text-violet-700">
                    <p>Required columns:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>name</li>
                      <li>description</li>
                      <li>price</li>
                      <li>stock</li>
                      <li>category</li>
                      <li>subcategory</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;