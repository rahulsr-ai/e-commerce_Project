"use client";


import React from "react";
import Link from "next/link";

import {
  PanelLeftClose,
  PanelLeft,
  ShoppingCart,
  Users,
  Package,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    {
      icon: BarChart3,
      label: "Dashboard",
      active: false,
      link: "/admin/dashboard",
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      active: true,
      link: "/admin/dashboard/order",
    },
    {
      icon: Users,
      label: "Customers",
      active: false,
      link: "/admin/dashboard/customer",
    },
    {
      icon: Package,
      label: "Products",
      active: false,
      link: "/admin/dashboard/product",
    },
    {
      icon: Settings,
      label: "Settings",
      active: false,
      link: "/admin/dashboard/settings",
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full w-full bg-black border-r border-violet-800/20">
        {/* Sidebar Header */}
        <div
          className={`flex items-center p-6 border-b border-violet-800/20 ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-violet-600 hover:text-violet-400 transition-colors p-1.5 rounded-lg hover:bg-violet-600/5"
            title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isOpen ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`flex items-center ${
                    isOpen ? "px-4" : "justify-center px-2"
                  } py-3 text-sm rounded-lg transition-all duration-200 ${
                    item.active
                      ? "bg-violet-600/10 text-violet-400 font-medium"
                      : "text-gray-400 hover:bg-violet-600/5 hover:text-violet-400"
                  }`}
                  title={!isOpen ? item.label : undefined}
                >
                  <item.icon
                    className={`w-5 h-5 ${isOpen ? "mr-3" : ""} ${
                      item.active ? "text-violet-400" : "text-violet-500"
                    }`}
                  />
                  {isOpen && item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-violet-800/20">
          <button
            className={`flex items-center ${
              isOpen ? "w-full px-4" : "justify-center w-full px-2"
            } py-3 text-gray-400 hover:text-violet-400 hover:bg-violet-600/5 rounded-lg transition-all duration-200`}
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 text-violet-500" />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
