import React from 'react';

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <div className="space-y-4">
        <div className="p-4 bg-background rounded-lg">
          <h3 className="font-medium mb-2">Email Notifications</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Marketing emails</span>
            <button className="w-12 h-6 bg-surface rounded-full relative">
              <span className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full" />
            </button>
          </div>
        </div>
        <div className="p-4 bg-background rounded-lg">
          <h3 className="font-medium mb-2">Delete Account</h3>
          <p className="text-gray-400 mb-4">Once you delete your account, there is no going back.</p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;