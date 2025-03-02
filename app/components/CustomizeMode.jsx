"use client";

import { motion } from "framer-motion";
import React from "react";

const AddressModel = ({ open, setOpen }) => {
  return (
    open && (
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
          <h3 className="text-lg font-medium mb-2">Setup Address</h3>

          <form>
            <p className="text-zinc-400 mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>

           

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600"
                // onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500"
                // onClick={handleDeleteAccount}
              >
                Confirm
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )
  );
};

export default AddressModel;
