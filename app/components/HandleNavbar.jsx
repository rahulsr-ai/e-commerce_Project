"use client";

import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "@/context/Authcontext";

const HandleNavbar = () => {
  const { user, setUser } = useAuth();

  return user?.role === "admin" || user === null ? <Navbar /> : <div></div>;
};

export default HandleNavbar;
