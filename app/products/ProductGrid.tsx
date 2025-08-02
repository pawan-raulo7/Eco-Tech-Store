'use client';

import Link from 'next/link';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'EcoCharge Solar Power Bank 20000mAh',
    price: 2399.99,
    originalPrice: 2899.99,
    rating: 4.8,
    reviews: 324,
    image: 'https://readdy.ai/api/search-image?query=Premium%20solar%20power%20bank%20with%20sleek%20design%2C%20portable%20solar%20charging%20device%2C%20sustainable%20technology%2C%20modern%20minimalist%20style%2C%20clean%20product%20photography%2C%20white%20background%2C%20professional%20lighting%2C%20eco-friendly%20materials%20visible&width=400&height=400&seq=grid-1&orientation=squarish',
    badge: 'Best Seller',
    isWishlisted: false
  },
  {
    id: 2,
    name: 'Smart Bamboo Wireless Charger',
    price: 1899.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 189,
    image: 'https://readdy.ai/api/search-image?query=Elegant%20bamboo%20wireless%20charging%20pad%2C%20natural%20wood%20finish%2C%20modern%20sustainable%20design%2C%20smartphone%20charging%20wirelessly%2C%20eco-friendly%20materials%2C%20minimal%20aesthetic%2C%20clean%20white%20background%2C%20professional%20product%20shot&width=400&height=400&seq=grid-2&orientation=squarish',
    badge: 'Eco Choice',
    isWishlisted: true
  },
  {
    id: 3,
    name: 'Recycled Ocean Plastic Phone Case',
    price: 1299.99,
    originalPrice: 1599.99,
    rating: 4.6,
    reviews: 567,
    image: 'https://readdy.ai/api/search-image?query=Sustainable%20phone%20case%20made%20from%20recycled%20ocean%20plastic%2C%20protective%20smartphone%20cover%2C%20eco-friendly%20materials%2C%20modern%20design%2C%20clear%20protective%20features%2C%20clean%20background%2C%20professional%20product%20photography&width=400&height=400&seq=grid-3&orientation=squarish',
    badge: 'Ocean Plastic',
    isWishlisted: false
  },
  {
    id: 4,
    name: 'Energy Monitor Smart Plug WiFi',
    price: 1499.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 201,
    image: 'https://readdy.ai/api/search-image?query=Smart%20energy%20monitoring%20plug%2C%20white%20modern%20design%2C%20digital%20display%20showing%20power%20usage%2C%20sustainable%20home%20automation%20device%2C%20clean%20minimalist%20style%2C%20professional%20product%20photography%2C%20white%20background&width=400&height=400&seq=grid-4&orientation=squarish',
    badge: 'Smart Home',
    isWishlisted: false
  },
  {
    id: 5,
    name: 'Sustainable Laptop Stand Bamboo',
    price: 3999.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 143,
    image: 'https://readdy.ai/api/search-image?query=Elegant%20bamboo%20laptop%20stand%20with%20adjustable%20height%2C%20sustainable%20office%20accessory%2C%20natural%20wood%20finish%2C%20ergonomic%20design%2C%20modern%20workspace%20setup%2C%20clean%20background%2C%20professional%20product%20photography&width=400&height=400&seq=grid-5&orientation=squarish',
    badge: 'Ergonomic',
    isWishlisted: false
  },
  {
    id: 6,
    name: 'Solar LED Desk Lamp with USB',
    price: 2799.99,
    originalPrice: 3299.99,
    rating: 4.4,
    reviews: 89,
    image: 'https://readdy.ai/api/search-image?query=Modern%20solar%20powered%20LED%20desk%20lamp%2C%20adjustable%20design%2C%20USB%20charging%20port%2C%20sustainable%20lighting%20solution%2C%20energy%20efficient%2C%20contemporary%20office%20setup%2C%20clean%20white%20background%2C%20professional%20lighting&width=400&height=400&seq=grid-6&orientation=squarish',
    badge: 'Solar',
    isWishlisted: false
  }
];

export default function ProductGrid() {
  const [wishlist, setWishlist] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.isWishlisted;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const [sortBy, setSortBy] = useState('featured');

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`w-4 h-4 flex items-center justify-center ${
          i < Math.floor(rating)
            ? 'ri-star-fill text-yellow-400'
            : 'ri-star-line text-gray-300'
        }`}
      ></i>
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-600 font-medium">{products.length} products found</p>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white pr-8"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {product.badge}
                </span>
              </div>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer group/heart"
              >
                <i className={`w-6 h-6 flex items-center justify-center transition-all ${
                  wishlist[product.id] 
                    ? 'ri-heart-fill text-red-500 scale-110' 
                    : 'ri-heart-line text-gray-600 group-hover/heart:text-red-500'
                }`}></i>
              </button>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                {product.name}
              </h3>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600 font-medium">({product.reviews})</span>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl">
                  Add to Cart
                </button>
                <Link
                  href={`/products/${product.id}`}
                  className="w-14 h-14 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 cursor-pointer flex items-center justify-center group/view"
                >
                  <i className="ri-eye-line w-6 h-6 flex items-center justify-center text-gray-600 group-hover/view:text-green-600 transition-colors"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <button className="bg-green-600 text-white px-12 py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl">
          Load More Products
        </button>
      </div>
    </div>
  );
}