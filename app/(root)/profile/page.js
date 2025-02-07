//@ts-nocheck
"use client";

import React, { useState, Suspense, lazy, useEffect } from "react";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  Edit,
} from "lucide-react";
import ProfileSkeleton from "./Skeleton";
import TabButton from "./tabsButton.jsx";
import ErrorState from "./ErrorState";
import { useAuth } from "@/context/Authcontext";
import axios from "axios";
import { useRouter } from "next/navigation";

// Lazy loaded tab contents
const ProfileOverview = lazy(() => import("./ProfileOverView"));
const OrderHistory = lazy(() => import("./OrderHistory"));
const Wishlist = lazy(() => import("./WhisList"));
const SavedAddresses = lazy(() => import("./SavedAddress"));
const PaymentMethods = lazy(() => import("./PaymentMethods"));
const AccountSettings = lazy(() => import("./AccountSetting"));
const EditProfile = lazy(() => import("./editProfile"));

const tabs = [
  { id: "profile", label: "Profile", icon: User, component: ProfileOverview },
  { id: "orders", label: "Orders", icon: ShoppingBag, component: OrderHistory },
  { id: "wishlist", label: "Wishlist", icon: Heart, component: Wishlist },
  {
    id: "addresses",
    label: "Addresses",
    icon: MapPin,
    component: SavedAddresses,
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    component: PaymentMethods,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    component: AccountSettings,
  },
  { id: "edit", label: "Edit Profile", icon: Edit, component: EditProfile },
];

const Profile = () => {
  const { user , setUser} = useAuth();
  console.log(user);
  const router = useRouter();
  

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/User");
      console.log(data);
      // if(data.user.code === "0001") {
      //   router.push("/");
      // }
    } catch (error) {
      console.log("Error fetching user data");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // <ErrorState message="Please sign in to view your profile" />;

  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual auth check

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return <ErrorState message="Please sign in to view your profile" />;
  }

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4 mt-8 md:p-8">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            {/* Profile Header */}
            <div className="text-center mb-8 mt-10">
              <div className="w-32 h-32 mx-auto bg-zinc-800 rounded-full mb-4 overflow-hidden">
                <img
                  src={"/placeholder-image.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">{""}</h1>
              <p className="text-indigo-400"> {""}</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </div>
                </TabButton>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-zinc-800 rounded-lg p-4 md:p-6">
              <Suspense fallback={<ProfileSkeleton />}>
                {activeTab === "edit" ? (
                  <div className="flex flex-col items-center justify-center"></div>
                ) : (
                  ActiveComponent && <ActiveComponent />
                )}
              </Suspense>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
