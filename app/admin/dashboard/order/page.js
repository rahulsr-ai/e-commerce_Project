"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getAllOrdersData } from "@/lib/apiCalls";
const CustomerNew = dynamic(() => import("@/app/components/adminComponents/customer/CustomerNew"))

const Page = () => {
  const [UserOrderData, setUserOrderData] = useState([]);
  const [FixrealData, setFixrealData] = useState();

  const fetchData = async () => {
    const { finalResult } = await getAllOrdersData();
    // console.log("response", finalResult);
    setUserOrderData(finalResult);
    setFixrealData(finalResult);
    // console.log('finalResult', finalResult)
  };

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div>
      <CustomerNew
       UserOrderData={UserOrderData}
       setUserOrderData={setUserOrderData}
       FixrealData={FixrealData} />
    
    </div>
  );
};

export default Page;
