import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { SidebarProvider } from "@/context/SidebarContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({ children }) {
  return (
  
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <SidebarProvider>{children}</SidebarProvider>
      </div>
 
  );
}
