'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { recycledProducts } from '../lib/products';
import { cartService } from '../lib/cart';

export default function Home() {
  const [featuredProducts] = useState(recycledProducts.slice(0, 6));
  
  const handleAddToCart = (product: any) => {
    cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category
    });
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message (you could implement a toast notification here)
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20recycled%20products%20display%2C%20eco-friendly%20sustainable%20materials%2C%20green%20technology%20accessories%20made%20from%20recycled%20ocean%20plastic%20and%20reclaimed%20wood%2C%20modern%20minimalist%20aesthetic%2C%20environmental%20consciousness%2C%20clean%20white%20background%20with%20natural%20lighting&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 mb-6">
                Shop <span className="text-green-600">Recycled</span> Products
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Discover amazing products made from recycled materials. Every purchase helps reduce waste and supports a circular economy. From ocean plastic to reclaimed wood, find sustainable alternatives that don't compromise on quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/products"
                  className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Shop Now
                </Link>
                <Link 
                  href="#featured"
                  className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-2xl hover:bg-green-50 transition-all duration-300 font-bold text-lg cursor-pointer"
                >
                  View Featured
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-xl text-gray-600">Explore our range of recycled and upcycled products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Electronics',
                  count: recycledProducts.filter(p => p.category === 'Electronics').length,
                  image: 'https://readdy.ai/api/search-image?query=Recycled%20electronic%20accessories%2C%20sustainable%20tech%20products%2C%20laptop%20stands%20and%20charging%20pads%20made%20from%20ocean%20plastic%2C%20modern%20eco-friendly%20electronics%2C%20green%20technology%2C%20clean%20product%20display&width=300&height=200&seq=cat-electronics&orientation=landscape',
                  href: '/products?category=Electronics'
                },
                {
                  name: 'Accessories',
                  count: recycledProducts.filter(p => p.category === 'Accessories').length,
                  image: 'https://readdy.ai/api/search-image?query=Recycled%20office%20accessories%2C%20phone%20holders%20and%20desk%20accessories%20made%20from%20sustainable%20materials%2C%20eco-friendly%20workspace%20products%2C%20modern%20minimalist%20design%2C%20green%20office%20supplies&width=300&height=200&seq=cat-accessories&orientation=landscape',
                  href: '/products?category=Accessories'
                },
                {
                  name: 'Storage',
                  count: recycledProducts.filter(p => p.category === 'Storage').length,
                  image: 'https://readdy.ai/api/search-image?query=Sustainable%20storage%20solutions%2C%20recycled%20organizers%20and%20containers%2C%20eco-friendly%20desk%20organization%2C%20upcycled%20storage%20boxes%2C%20green%20office%20furniture%2C%20environmental%20consciousness&width=300&height=200&seq=cat-storage&orientation=landscape',
                  href: '/products?category=Storage'
                },
                {
                  name: 'Decor',
                  count: recycledProducts.filter(p => p.category === 'Decor').length,
                  image: 'https://readdy.ai/api/search-image?query=Upcycled%20home%20decor%2C%20recycled%20decorative%20items%2C%20sustainable%20interior%20design%20products%2C%20eco-friendly%20wall%20art%20and%20clocks%2C%20repurposed%20materials%2C%20modern%20green%20living&width=300&height=200&seq=cat-decor&orientation=landscape',
                  href: '/products?category=Decor'
                }
              ].map((category) => (
                <Link key={category.name} href={category.href} className="group">
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                    <div className="relative h-48">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.count} products</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="featured" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600">Popular items made from recycled materials</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {product.recycledMaterial}
                      </span>
                    </div>
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                          Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} w-4 h-4 flex items-center justify-center`}
                          ></i>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`px-6 py-3 rounded-xl font-semibold transition-colors cursor-pointer ${
                          product.inStock
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                    
                    <div className="mt-4 text-sm text-green-600">
                      <i className="ri-leaf-line w-4 h-4 flex items-center justify-center mr-1 inline-block"></i>
                      CO₂ Saved: {product.co2Saved}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link 
                href="/products"
                className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl cursor-pointer"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Environmental Impact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Environmental Impact</h2>
              <p className="text-xl text-gray-600">Together, we're making a difference</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-recycle-line w-10 h-10 flex items-center justify-center text-green-600"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">50,000+</h3>
                <p className="text-gray-600">Plastic bottles recycled</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-earth-line w-10 h-10 flex items-center justify-center text-blue-600"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">25 Tons</h3>
                <p className="text-gray-600">CO₂ emissions prevented</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-tree-line w-10 h-10 flex items-center justify-center text-purple-600"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">1,200</h3>
                <p className="text-gray-600">Trees worth of CO₂ absorbed</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}