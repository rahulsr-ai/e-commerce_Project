import React from 'react'
import dynamic from 'next/dynamic'
const AddProduct = dynamic(() => import('@/app/components/adminComponents/Product/AddProduct.jsx'), { ssr: false })
const page = () => {
  return (
       <div>
        <AddProduct/>
       </div>
  )
}

export default page