'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authService, User } from '../lib/auth';
import { cartService } from '../lib/cart';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    // Check for logged in user
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    // Update cart count
    updateCartCount();

    // Listen for cart changes
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for cart updates within the same tab
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const updateCartCount = () => {
    setCartCount(cartService.getCartCount());
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    window.location.href = '/';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="font-['Pacifico'] text-3xl text-green-600 group-hover:text-green-700 transition-colors">RecycleStore</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Products
            </Link>
            {user && (
              <Link href="/orders" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                My Orders
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-green-600 transition-colors group"
              >
                <i className="ri-search-line w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search recycled products..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full mt-3 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-colors font-semibold cursor-pointer"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-600 hover:text-green-600 transition-colors relative group">
              <i className="ri-shopping-cart-line w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block">
                  <span className="text-gray-700 text-sm">Welcome, {user.firstName}!</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition-colors font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                  Sign In
                </Link>
                <Link href="/register" className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="ri-menu-line w-7 h-7 flex items-center justify-center"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t mt-2 pt-6 pb-6 bg-white">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                Products
              </Link>
              {user && (
                <Link href="/orders" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
                  My Orders
                </Link>
              )}
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="pt-4 border-t border-gray-200">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-colors font-semibold cursor-pointer"
                >
                  Search
                </button>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}