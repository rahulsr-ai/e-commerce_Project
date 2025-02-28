//@ts-nocheck
"use client";

import { GetUserDetails } from "@/lib/apiCalls";
import {
  Briefcase,
  Calendar,
  Mail,
  MapPin,
  Phone,
  ShieldCheckIcon,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const params = { firstName: "John", lastName: "Wick" };

const ProfileOverview = ({ user }) => {
  const formattedDate = new Date(user?.createdAt).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Profile Overview
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
              <User className="w-5 h-5 text-violet-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className="font-medium text-gray-900 dark:text-white text-sm md:text-md">
                  {user?.name &&
                    user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
              <Mail className="w-5 h-5 text-violet-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="font-medium text-gray-900 dark:text-white text-sm md:text-md  ">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
              <Calendar className="w-5 h-5 text-violet-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Member Since
                </p>
                <p className="font-medium text-gray-900 dark:text-white text-sm md:text-md ">
                  {formattedDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <div className="flex flex-col gap-1 p-3 text-sm bg-gray-50 dark:bg-neutral-800 rounded-lg text-left">
                <div className="inline-flex items-center space-x-3 ">
                  <ShieldCheckIcon className="w-5 h-5 text-violet-500 " />
                  <p className="text-md text-gray-500 dark:text-gray-400">
                    Signed In
                  </p>
                </div>
                <p className="font-medium text-gray-900 dark:text-white ml-7  ">
                  {user?.authProvider === "google" ? "Google" : "Email"}
                </p>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg text-left text-sm">
                <div className=" inline-flex items-center space-x-3 ">
                  <User className="w-5 h-5 text-violet-500 " />
                  <p className="text-md text-gray-500 dark:text-gray-400">
                    Role
                  </p>
                </div>
                <p className="font-medium text-gray-900 dark:text-white ml-8 ">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg 
                     transition-colors duration-200 flex items-center space-x-2 
                     focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
