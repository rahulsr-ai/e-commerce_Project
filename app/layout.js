import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "../context/Authcontext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StoreX",
  icons: { 
    icon: "/shopping-bag 01.png"
  },
  description: "Online Store for all your needs",
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
