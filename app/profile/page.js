"use client";

import { useState } from "react";
import {
  User,
  Package,
  Edit2,
  Save,
  X,
  ShoppingBag,
  Phone,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { UserProfile } from "@clerk/nextjs";

export default function ProfileCard() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    user?.phoneNumbers[0]?.phoneNumber || ""
  );

  const orders = [
    {
      id: "ORD-001",
      date: "2024-03-20",
      status: "Delivered",
      total: 129.99,
      items: 2,
    },
    {
      id: "ORD-002",
      date: "2024-03-15",
      status: "In Transit",
      total: 79.99,
      items: 1,
    },
  ];

  const wishlist = [
    {
      id: "WISH-001",
      name: "Leather Crossbody Bag",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: "WISH-002",
      name: "Gold Watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=150&auto=format&fit=crop",
    },
  ];

  const handleSave = async () => {
    try {
      if (!user) return;

      // Update phone number if changed
      if (phoneNumber && phoneNumber !== user.phoneNumbers[0]?.phoneNumber) {
        await user.createPhoneNumber({ phoneNumber });
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-zinc-950 text-white border border-indigo-500/20 rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-zinc-950 text-white border border-indigo-500/20 rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-zinc-400">
              Please sign in to view your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8  border-indigo-500/20 ">
      <div className="bg-zinc-950 text-white border-2 rounded-lg shadow-xl">
        <div className="p-6 space-y-6">


          {/* <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24">
              <img
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                className="w-full h-full rounded-full object-cover border-2 border-indigo-500"
              />
              {!user.imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 rounded-full">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
              <p className="text-zinc-400">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 flex items-center gap-2 rounded-md border border-indigo-500 hover:bg-indigo-500/20 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div> */}



          <div className="space-y-6">

            <div className="border-b border-zinc-800">
              <div className="flex space-x-1">
                {["details", "orders", "wishlist"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-indigo-500 text-white rounded-t-lg"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "details" && (
              <div className="flex items-center justify-between">
                <UserProfile />
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-indigo-400" />
                          <span className="font-medium">{order.id}</span>
                        </div>
                        <p className="text-sm text-zinc-400">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="px-2 py-1 text-sm border border-indigo-500 text-indigo-400 rounded-full">
                          {order.status}
                        </span>
                        <span className="text-sm">
                          {order.items} {order.items === 1 ? "item" : "items"}
                        </span>
                        <span className="font-medium">${order.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 max-h-[400px] overflow-y-auto pr-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-lg font-semibold">${item.price}</p>
                        <button className="w-full px-4 py-2 flex items-center justify-center gap-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors">
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  );
}

// <div className="container mx-auto px-4 py-8">
//       <div className="bg-zinc-950 text-white border border-indigo-500/20 rounded-lg shadow-xl">
//         <div className="p-6 space-y-6">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <div className="relative w-24 h-24">
//               <img
//                 src={user.imageUrl}
//                 alt={user.fullName || 'Profile'}
//                 className="w-full h-full rounded-full object-cover border-2 border-indigo-500"
//               />
//               {!user.imageUrl && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 rounded-full">
//                   <User className="w-12 h-12" />
//                 </div>
//               )}
//             </div>
//             <div className="flex-1 text-center md:text-left">
//               <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
//               <p className="text-zinc-400">{user.primaryEmailAddress?.emailAddress}</p>
//             </div>
//             {!isEditing && (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="px-4 py-2 flex items-center gap-2 rounded-md border border-indigo-500 hover:bg-indigo-500/20 transition-colors"
//               >
//                 <Edit2 className="w-4 h-4" />
//                 Edit Profile
//               </button>
//             )}
//           </div>

//           <div className="space-y-6">
//             <div className="border-b border-zinc-800">
//               <div className="flex space-x-1">
//                 {['details', 'orders', 'wishlist'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 text-sm font-medium transition-colors ${
//                       activeTab === tab
//                         ? 'bg-indigo-500 text-white rounded-t-lg'
//                         : 'text-zinc-400 hover:text-white'
//                     }`}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {activeTab === 'details' && (
//               <div className="space-y-4 pt-36">
//                 <div className="grid gap-4">
//                   <div className="space-y-2">
//                     <label htmlFor="name" className="block text-sm font-medium text-zinc-400">
//                       Full Name
//                     </label>
//                     <input
//                       id="name"
//                       type="text"
//                       value={user.fullName || ''}
//                       readOnly
//                       className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label htmlFor="email" className="block text-sm font-medium text-zinc-400">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       value={user.primaryEmailAddress?.emailAddress || ''}
//                       readOnly
//                       className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label htmlFor="phone" className="block text-sm font-medium text-zinc-400">
//                       Phone Number
//                     </label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
//                       <input
//                         id="phone"
//                         type="tel"
//                         value={phoneNumber}
//                         readOnly={!isEditing}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         className="w-full pl-10 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {isEditing && (
//                   <div className="flex gap-2 justify-end mt-4">
//                     <button
//                       onClick={() => setIsEditing(false)}
//                       className="px-4 py-2 flex items-center gap-2 rounded-md border border-red-500 hover:bg-red-500/20 transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       className="px-4 py-2 flex items-center gap-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors"
//                     >
//                       <Save className="w-4 h-4" />
//                       Save Changes
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'orders' && (
//               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
//                 {orders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
//                   >
//                     <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <Package className="w-4 h-4 text-indigo-400" />
//                           <span className="font-medium">{order.id}</span>
//                         </div>
//                         <p className="text-sm text-zinc-400">
//                           {new Date(order.date).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="flex flex-wrap gap-2 items-center">
//                         <span className="px-2 py-1 text-sm border border-indigo-500 text-indigo-400 rounded-full">
//                           {order.status}
//                         </span>
//                         <span className="text-sm">
//                           {order.items} {order.items === 1 ? 'item' : 'items'}
//                         </span>
//                         <span className="font-medium">${order.total}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === 'wishlist' && (
//               <div className="grid gap-4 grid-cols-1 md:grid-cols-2 max-h-[400px] overflow-y-auto pr-4">
//                 {wishlist.map((item) => (
//                   <div
//                     key={item.id}
//                     className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
//                   >
//                     <div className="flex gap-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />
//                       <div className="flex-1 space-y-2">
//                         <h3 className="font-medium">{item.name}</h3>
//                         <p className="text-lg font-semibold">${item.price}</p>
//                         <button className="w-full px-4 py-2 flex items-center justify-center gap-2 rounded-md bg-indigo-500 hover:bg-indigo-600 transition-colors">
//                           <ShoppingBag className="w-4 h-4" />
//                           Add to Cart
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
