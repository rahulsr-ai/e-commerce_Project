"use client";


import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HandleProductClick, HandleWishlist } from "@/lib/apiCalls";
import ProductPageNew from "../../../components/PagesComponent/ProductPageNew";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const router = useRouter();

  const [SingleProduct, setSingleProduct] = useState([]);
  const [RelatedProducts, setRelatedProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { name } = useParams();

  const getProductData = async () => {
    const response = await HandleProductClick(name);
    setSingleProduct(response.product);

    const filter = response.relatedProducts.filter(
      (product) => product._id !== response.product._id
    );

    setRelatedProducts(filter.slice(0, 3));
  };

  useEffect(() => {
    getProductData();
  }, [name]);

  // Load wishlist from LocalStorage when the component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleWishlist = async (id) => {
    const Logincode = localStorage.getItem("code");

    if (!Logincode || Logincode !== "0001") {
      toast.loading("Log in to continue shopping", { duration: 1000 });
      router.push("/sign-in");
      return;
    }

    const response = await HandleWishlist(id);
    console.log(response);

    let updatedWishlist;
    if (wishlist.includes(id)) {
      updatedWishlist = wishlist.filter((itemId) => itemId !== id);
    } else {
      updatedWishlist = [...wishlist, id];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to LocalStorage
  };



  return (
    <div className="min-h-screen pt-10 bg-[var(--background-color)]">
      <ProductPageNew
        wishlist={wishlist}
        setWishlist={setWishlist}
        SingleProduct={SingleProduct}
        RelatedProducts={RelatedProducts}
        handleWishlist={handleWishlist}
      />
    </div>
  );
};

export default ProductPage;
