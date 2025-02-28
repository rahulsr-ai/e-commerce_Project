"use client";

import React from 'react'
import dynamic from 'next/dynamic'
const OrderPage = dynamic(() => import('@/app/components/adminComponents/customer/Customer.jsx'), { ssr: false })
 const page = () => {
  return (
    <div>
    <OrderPage/>
    </div>
  )
}

export default page
