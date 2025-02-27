"use client";

import React from "react";
import dynamic from "next/dynamic";
const InventoryPage = dynamic(() => import("@/app/components/adminComponents/inventory/inventory.jsx"), { ssr: false });
const page = () => {
 


  return (
    <div>
      <InventoryPage />
    </div>
  );
};

export default page;
