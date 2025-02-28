"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AccountSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      const { data } = await axios.post("/api/auth/delete");
      console.log(data);

      if (data?.success) {
        toast.success("Account deleted successfully");
        
        setIsModalOpen(false);
        router.push("/");
        localStorage.clear();
        return;
      }
    } catch (error) {
      console.log("Error deleting account:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Account Settings
      </h2>
      <div className="space-y-4 text-center">
        <div className="p-4 bg-background rounded-lg">
          <h3 className="font-medium mb-2">Delete Account</h3>
          <p className="text-gray-400 mb-4">
            Once you delete your account, there is no going back.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-zinc-800 rounded-lg border border-zinc-700 p-6 w-full max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-lg font-medium mb-2">Confirm Deletion</h3>
            <p className="text-zinc-400 mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500"
                onClick={handleDeleteAccount}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AccountSettings;
