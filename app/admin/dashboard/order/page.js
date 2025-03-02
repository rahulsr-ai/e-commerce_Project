"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getAllOrdersData } from "@/lib/apiCalls";

const OrderPage = dynamic(
  () => import("@/app/components/adminComponents/customer/Customer.jsx"),
  { ssr: false }
);

const CustomerNew = dynamic(() => import("@/app/components/adminComponents/customer/CustomerNew.jsx"), { ssr: false })

const page = () => {
  const [UserOrderData, setUserOrderData] = useState([]);
  const [FixrealData, setFixrealData] = useState();

  const fetchData = async () => {
    const { finalResult } = await getAllOrdersData();
    // console.log("response", finalResult);
    setUserOrderData(finalResult);
    setFixrealData(finalResult);
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
      {/* <OrderPage
        UserOrderData={UserOrderData}
        setUserOrderData={setUserOrderData}
        FixrealData={FixrealData}
      /> */}
    </div>
  );
};

export default page;
