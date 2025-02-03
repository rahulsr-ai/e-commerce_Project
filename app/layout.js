//@ts-nocheck

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { AuthProvider } from "../context/Authcontext";
import { Toaster } from "react-hot-toast";
import { TempProvider } from "@/context/TempStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        
          <AuthProvider>
            <Navbar />

            <div className="">{children}</div>
            <Toaster position="top-center" reverseOrder={false} />
          </AuthProvider>
        
      </body>
    </html>
  );
}
