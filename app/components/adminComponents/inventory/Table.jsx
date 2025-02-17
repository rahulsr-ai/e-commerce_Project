import { Edit2 } from 'lucide-react'
import React from 'react'

const Table = ({currentItems, handleEditClick}) => {


  return (
     
     <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-black">
         <tr>
           <th className="px-6 py-3 text-left text-xs font-medium text-violet-500 uppercase tracking-wider">
             Product Name
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-violet-500 uppercase tracking-wider">
             SKU
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-violet-500 uppercase tracking-wider">
             Price
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-violet-500 uppercase tracking-wider">
             Stock
           </th>
           <th className="px-6 py-3 text-right text-xs font-medium text-violet-500 uppercase tracking-wider">
             Actions
           </th>
         </tr>
       </thead>
       <tbody className="bg-neutral-90 divide-y divide-gray-200">
         {currentItems.map((product) => (
           <tr key={product.id} className="hover:bg-black/50">
             <td className="px-6 py-4 whitespace-nowrap">
               <div className="text-sm font-medium text-white">
                 {product.name}
               </div>
             </td>
             <td className="px-6 py-4 whitespace-nowrap">
               <div className="text-sm text-violet-200">{product.sku}</div>
             </td>
             <td className="px-6 py-4 whitespace-nowrap">
               <div className="text-sm text-white">
                 ${product.price.toFixed(2)}
               </div>
             </td>
             <td className="px-6 py-4 whitespace-nowrap">
               <span
                 className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                   product.stock > 50
                     ? "bg-green-600 text-white"
                     : product.stock > 20
                     ? "bg-yellow-600 text-white"
                     : "bg-red-100 text-red-800"
                 }`}
               >
                 {product.stock} units
               </span>
             </td>
             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
               <button
                 onClick={() => handleEditClick(product)}
                 className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs 
                 font-medium rounded-md text-white  bg-violet-500 hover:bg-white hover:text-black focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-blue-500"
               >
                 <Edit2 className="h-4 w-4 mr-1" />
                 Edit Stock
               </button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>

  )
}

export default Table