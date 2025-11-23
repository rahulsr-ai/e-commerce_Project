import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "../context/Authcontext";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickCart",
  icons: {
    icon: "/shopping-bag 01.png",
  },
  description: "Online Store for all your needs",
  themeColor: "#7C3AED"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="theme-color" content="#7C3AED" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-[var(--background-color)] bg-white`}
      >
        <AuthProvider>
          <header className="w-full">
            <Navbar />
          </header>
          <main className="w-full">
            <Suspense fallback={<div></div>}>
              <div>{children}</div>
            </Suspense>

            <Toaster position="top-center" reverseOrder={false} />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
