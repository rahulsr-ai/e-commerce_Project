import React from 'react';
import { MapPin } from 'lucide-react';

const demoAddresses = [
  {
    id: "ADDR-001",
    name: "John Doe",
    street: "123 Elm St",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    country: "USA",
  },
  {
    id: "ADDR-002",
    name: "Jane Smith",
    street: "456 Oak Ave",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  {
    id: "ADDR-003",
    name: "Alice Johnson",
    street: "789 Pine Rd",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    country: "USA",
  }
];

const SavedAddresses = () => {
  if (demoAddresses.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <MapPin className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-400">No addresses saved</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
      <div className="space-y-4">
        {demoAddresses.map((address) => (
          <div key={address.id} className="p-4 border rounded-lg shadow-sm hover:bg-zinc-900/10">
            <div className="text-sm text-zinc-400">{address.name}</div>
            <div className="font-semibold text-white">{address.street}</div>
            <div className="text-sm text-zinc-300">
              {address.city}, {address.state} {address.zip}, {address.country}
            </div>
            <div className="mt-2">
              <button className="text-indigo-500 hover:text-indigo-400">Edit</button>
              <span className="mx-2 text-zinc-400">|</span>
              <button className="text-red-500 hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAddresses;
