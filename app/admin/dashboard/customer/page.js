"use client";

import React, { useEffect, useState } from "react";;
import dynamic from "next/dynamic";
import { GetallUserData } from "@/lib/apiCalls";
const Customer = dynamic(() => import("@/app/components/adminComponents/order/Order.jsx"), { ssr: false });




const Page = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { users } = await GetallUserData();
      setUser(users);
    };
    getData();
  }, []);

  return <Customer user={user} />;
};

export default Page;
