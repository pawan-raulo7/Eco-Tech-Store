'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="font-['Pacifico'] text-3xl text-green-400">EcoTech</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for sustainable tech accessories and smart home eco-products. Building a greener future through innovation.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all cursor-pointer">
                <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center"></i>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all cursor-pointer">
                <i className="ri-twitter-fill w-5 h-5 flex items-center justify-center"></i>
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all cursor-pointer">
                <i className="ri-instagram-fill w-5 h-5 flex items-center justify-center"></i>
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <div className="space-y-4">
              <Link href="/products" className="block text-gray-400 hover:text-white transition-colors">
                All Products
              </Link>
              <Link href="/categories" className="block text-gray-400 hover:text-white transition-colors">
                Categories
              </Link>
              <Link href="/orders" className="block text-gray-400 hover:text-white transition-colors">
                My Orders
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Customer Service</h3>
            <div className="space-y-4">
              <Link href="/orders" className="block text-gray-400 hover:text-white transition-colors">
                Order History
              </Link>
              <Link href="/orders" className="block text-gray-400 hover:text-white transition-colors">
                Track Order
              </Link>
              <Link href="/support" className="block text-gray-400 hover:text-white transition-colors">
                Support Center
              </Link>
              <Link href="/returns" className="block text-gray-400 hover:text-white transition-colors">
                Returns & Refunds
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Subscribe to get updates on new eco-friendly products and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-xl text-gray-900 focus:outline-none bg-white border-0"
              />
              <button className="bg-green-600 px-6 py-3 rounded-r-xl hover:bg-green-700 transition-colors font-semibold whitespace-nowrap cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2024 EcoTech. All rights reserved. Sustainable technology for a better tomorrow.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}