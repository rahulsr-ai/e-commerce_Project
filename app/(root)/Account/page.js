"use client";

import React, { useState, Suspense, lazy, useEffect } from "react";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  ShoppingCart,
} from "lucide-react";
import ProfileSkeleton from "../../components/ProfileComponets/Skeleton";
import TabButton from "../../components/ProfileComponets/tabsButton.jsx";
import ErrorState from "../../components/ProfileComponets/ErrorState";
import { useRouter } from "next/navigation";
import { getAllProducts, GetUserDetails, getUserOrder } from "@/lib/apiCalls";

// Lazy loaded tab contents
const ProfileOverview = lazy(() =>
  import("../../components/ProfileComponets/ProfileOverView")
);
const OrderHistory = lazy(() =>
  import("../../components/ProfileComponets/OrderHistory")
);
const Wishlist = lazy(() =>
  import("../../components/ProfileComponets/WhisList")
);

const AccountSettings = lazy(() =>
  import("../../components/ProfileComponets/AccountSetting")
);
const SamplePage = lazy(() =>
  import("@/app/components/ProfileComponets/Sample")
);

const tabs = [
  { id: "profile", label: "Profile", icon: User, component: ProfileOverview },
  { id: "wishlist", label: "Wishlist", icon: Heart, component: Wishlist },
  {
    id: " Cart",
    label: "Cart ",
    icon: ShoppingCart,
    component: SamplePage,
  },
  { id: "orders", label: "Orders", icon: ShoppingBag, component: OrderHistory },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    component: AccountSettings,
  },
 
];

const Profile = () => {
  const router = useRouter();
  const [Products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("code");
    if (role === "2637") {
      router.push("/admin/dashboard/Inventory");
      return;
    }

    const fetchProducts = async () => {
      try {
        const userResponse = await GetUserDetails();
        setUser(userResponse?.user);
    
        const productsResponse = await getAllProducts();
        setProducts(productsResponse);
    
        const ordersResponse = await getUserOrder();
    
        console.log("ordersResponse", ordersResponse?.order); // ✅ Debugging
    
        // 🛠️ Ensure ordersResponse.order is an array
        const finalOrders = ordersResponse?.order?.map((singleOrder) => ({
          orderId: singleOrder._id,
          totalAmount: singleOrder.totalAmount,
          status: singleOrder.status,
          paymentStatus: singleOrder.paymentStatus,
          createdAt: singleOrder.createdAt,
          shippingAddress: singleOrder.shippingAddress,
          products: singleOrder.products
            .map((orderProduct) => {
              const product = productsResponse?.products.find(
                (p) => p._id === orderProduct.productId
              );
    
              if (!product) return null; // Safety check
    
              return {
                ...product, // Full product details
                quantity: orderProduct.quantity, // Cart quantity
                priceAtTimeOfOrder: orderProduct.price, // Price at order time
              };
            })
            .filter(Boolean), // Remove null values if product is missing
        }));
    
        setOrders(finalOrders);
        console.log("finalOrders", finalOrders); // ✅ Debugging
    
        // 🛒 Merge cart fields with product details
        const getUserCartData = userResponse?.user.cart
          ?.map((cartItem) => {
            const product = productsResponse?.products.find(
              (p) => p._id === cartItem.productId
            );
    
            if (!product) return null; // Safety check
    
            return {
              ...product, // Full product data (name, price, image, description)
              quantity: cartItem.quantity, // Cart se quantity
              priceAtTimeOfAdding: cartItem.priceAtTimeOfAdding, // Cart se price
            };
          })
          .filter(Boolean); // Remove null values
    
        setCartProducts(getUserCartData);
      } catch (error) {
        console.error("Error fetching products or user details:", error);
      }
    };
    

    fetchProducts();
  }, []);

  <ErrorState message="Please sign in to view your profile" />;

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
    <div
      className="min-h-screen bg-[var(--background-color)]-900 text-gray-200-100 p-4 mt-8 md:p-8
      "
    >
      <div className="max-w-7xl mx-auto ">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            {/* Profile Header */}
            <div className="text-center mb-8 mt-10">
              <div className="w-32 h-32 mx-auto bg-[var(--background-color)]-800 rounded-full mb-4 overflow-hidden">
                <img
                  src={"/others/userprofile01.jpg"}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">{""}</h1>
              <p className="text-violet-400"> {""}</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 justify-center mb-8 ">
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
            <div className="bg-[var(--background-color)]-950 rounded-lg p-4 md:p-6">
              <Suspense fallback={<ProfileSkeleton />}>
                {activeTab === "edit" ? (
                  <div className="flex flex-col items-center justify-center"></div>
                ) : (
                  ActiveComponent && (
                    <ActiveComponent
                      productsData={Products}
                      setproductsData={setProducts}
                      user={user}
                      setUser={setUser}
                      cartProducts={cartProducts}
                      orders={orders}
                    />
                  )
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
