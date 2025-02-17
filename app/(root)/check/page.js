"use client";

import React, { use, useEffect, useState } from 'react'
import ProductPage from './ProductPage'
import ProductPageNew from './ProductPageNew'

const page = () => {
  const [isloading, setIsloading] = useState(false);

  useEffect(() => { 
    setIsloading(true);
  }, []);
  return ( isloading &&
    <ProductPageNew/>
    // <ProductPage/>
  )
}

export default page