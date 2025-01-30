"use client";
//@ts-nocheck

import { UserProfile, useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios"; // Importing Axios
import Link from "next/link";

const ProfilePage = () => {
  return (
    <>
      {/* <SignedIn>
        <h1 className="text-3xl font-bold text-center mt-8">Your Profile</h1>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProfileDetails />
            <ProfileExtras />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut> */}
   
    </>
  );
};

export default ProfilePage;

const ProfileDetails = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
      <UserProfile />
    </div>
  );
};

const ProfileExtras = () => {
  const { user } = useUser(); // Extracting user from Clerk context
  const [orders, setOrders] = useState([
    {
      id: "",
      status: "",
    },
  ]);
  const [wishlist, setWishlist] = useState([
    {
      id: "",
      productName: "",
    },
  ]);
  const [loading, setLoading] = useState(true); // Loading state to show loading indicator

  useEffect(() => {
    if (user) {
      // Ensure user exists before making API requests
      setLoading(true); // Set loading state to true before data fetch

      // Fetch orders using Axios
      axios
        .get(`/api/orders?userId=${user.id}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });

      // Fetch wishlist using Axios
      axios
        .get(`/api/wishlist?userId=${user.id}`)
        .then((res) => {
          setWishlist(res.data);
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading state to false once data is fetched
        });
    }
  }, [user]);

  if (loading) {
    return <div className="text-center">Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      <ul className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between items-center py-3 border-b"
            >
              <span>Order #{order.id}</span>
              <span className="text-sm text-gray-500">{order.status}</span>
            </li>
          ))
        ) : (
          <li>No orders found</li>
        )}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Wishlist</h2>
      <ul className="space-y-4">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-3 border-b"
            >
              <span>{item.productName}</span>
            </li>
          ))
        ) : (
          <li>No items in your wishlist</li>
        )}
      </ul>
    </div>
  );
};
