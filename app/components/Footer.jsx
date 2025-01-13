"use client";

import React, { useEffect, useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
} from "lucide-react";

const Footer = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    domLoaded && (
      <footer className="bg-gray-900 text-gray-300 absolute bottom-0 w-full">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="text-indigo-500" size={24} />
                <span className="text-white font-bold text-xl">StoreX</span>
              </div>
              <p className="text-sm mb-4">
                Your one-stop destination for premium shopping. Discover the
                latest trends in fashion, electronics, and lifestyle products.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Contact Info
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin size={20} className="text-indigo-500 flex-shrink-0" />
                  <span>123 Shopping Street, Fashion Avenue, FL 12345</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={20} className="text-indigo-500" />
                  <span>+1 (234) 567-8900</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={20} className="text-indigo-500" />
                  <span>support@storex.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Newsletter
              </h3>
              <p className="text-sm mb-4">
                Subscribe to our newsletter and get 10% off your first purchase.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500"
                />
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">© 2024 StoreX. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <img
                  src="https://raw.githubusercontent.com/bedimcode/responsive-watches-website/main/assets/img/visa-logo.png"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://raw.githubusercontent.com/bedimcode/responsive-watches-website/main/assets/img/mastercard-logo.png"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="https://raw.githubusercontent.com/bedimcode/responsive-watches-website/main/assets/img/paypal-logo.png"
                  alt="PayPal"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
