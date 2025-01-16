//@ts-nocheck


"use client"
import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({ Children }) {
  return <SessionProvider>{Children}</SessionProvider>;
}
