"use client";

import React, { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Manageorder from "./order/page";

import { useSidebar } from "@/helpers/SidebarContext";

export default function RootLayout({ children }) {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
  }, []);

  return (
    isloading && (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Desktop Toggle Button */}

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          }`}
        >
          {children}
        </div>
      </div>
    )
  );
}
