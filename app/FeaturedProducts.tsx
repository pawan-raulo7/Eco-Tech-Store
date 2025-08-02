'use client';

import Link from 'next/link';
import { useState } from 'react';

const featuredProducts = [
  {
    id: 1,
    name: 'EcoCharge Solar Power Bank 20000mAh',
    price: 2399.99,
    originalPrice: 2899.99,
    rating: 4.8,
    reviews: 324,
    image: 'https://readdy.ai/api/search-image?query=Premium%20solar%20power%20bank%20with%20sleek%20black%20design%2C%20portable%20renewable%20energy%20device%2C%20modern%20sustainable%20technology%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20eco-friendly%20materials%20showcase&width=350&height=350&seq=featured-1&orientation=squarish',
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
    image: 'https://readdy.ai/api/search-image?query=Premium%20bamboo%20wireless%20charging%20pad%20with%20natural%20wood%20grain%2C%20smartphone%20charging%20wirelessly%2C%20sustainable%20materials%2C%20elegant%20minimalist%20design%2C%20warm%20lighting%2C%20professional%20product%20shot&width=350&height=350&seq=featured-2&orientation=squarish',
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
    image: 'https://readdy.ai/api/search-image?query=Protective%20phone%20case%20made%20from%20recycled%20ocean%20plastic%2C%20sustainable%20smartphone%20protection%2C%20modern%20eco-friendly%20design%2C%20ocean%20blue%20color%2C%20clean%20background%2C%20professional%20photography&width=350&height=350&seq=featured-3&orientation=squarish',
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
    image: 'https://readdy.ai/api/search-image?query=White%20smart%20energy%20monitoring%20plug%20with%20digital%20LED%20display%2C%20home%20automation%20device%2C%20modern%20minimalist%20design%2C%20power%20usage%20tracking%2C%20clean%20product%20photography%2C%20white%20background&width=350&height=350&seq=featured-4&orientation=squarish',
    badge: 'Smart Home',
    isWishlisted: false
  }
];

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState(
    featuredProducts.reduce((acc, product) => {
      acc[product.id] = product.isWishlisted;
      return acc;
    }, {} as Record<number, boolean>)
  );

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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular sustainable tech accessories loved by environmentally conscious consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {product.badge}
                  </span>
                </div>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer group/heart"
                >
                  <i className={`w-5 h-5 flex items-center justify-center transition-all ${
                    wishlist[product.id] 
                      ? 'ri-heart-fill text-red-500 scale-110' 
                      : 'ri-heart-line text-gray-600 group-hover/heart:text-red-500'
                  }`}></i>
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl">
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="w-12 h-12 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer flex items-center justify-center group/view"
                  >
                    <i className="ri-eye-line w-5 h-5 flex items-center justify-center text-gray-600 group-hover/view:text-green-600 transition-colors"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg cursor-pointer shadow-lg hover:shadow-xl"
          >
            View All Products
            <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}