'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Smart Home Devices',
    description: 'Energy-efficient automation for modern homes',
    image: 'https://readdy.ai/api/search-image?query=Modern%20smart%20home%20devices%20collection%20featuring%20eco-friendly%20smart%20thermostat%2C%20LED%20lighting%20controls%2C%20energy%20monitoring%20systems%2C%20sustainable%20materials%2C%20clean%20minimalist%20design%2C%20professional%20product%20photography%2C%20bright%20lighting&width=500&height=400&seq=cat-page-1&orientation=landscape',
    productCount: 45,
    usagePercent: 89,
    features: ['Energy Monitoring', 'Voice Control', 'App Integration', 'Eco-Friendly']
  },
  {
    id: 2,
    name: 'Solar Tech Accessories',
    description: 'Harness renewable energy for your devices',
    image: 'https://readdy.ai/api/search-image?query=Premium%20solar%20technology%20accessories%20including%20portable%20solar%20panels%2C%20solar%20power%20banks%2C%20solar%20chargers%2C%20renewable%20energy%20devices%2C%20sustainable%20technology%2C%20modern%20design%2C%20professional%20lighting%2C%20clean%20background&width=500&height=400&seq=cat-page-2&orientation=landscape',
    productCount: 32,
    usagePercent: 76,
    features: ['Portable Design', 'Fast Charging', 'Weather Resistant', 'Renewable Energy']
  },
  {
    id: 3,
    name: 'Eco Phone Accessories',
    description: 'Sustainable protection and charging solutions',
    image: 'https://readdy.ai/api/search-image?query=Eco-friendly%20phone%20accessories%20made%20from%20biodegradable%20materials%2C%20bamboo%20wireless%20chargers%2C%20recycled%20plastic%20cases%2C%20sustainable%20smartphone%20accessories%2C%20natural%20textures%2C%20professional%20product%20photography&width=500&height=400&seq=cat-page-3&orientation=landscape',
    productCount: 28,
    usagePercent: 92,
    features: ['Biodegradable', 'Drop Protection', 'Wireless Compatible', 'Recycled Materials']
  },
  {
    id: 4,
    name: 'Green Computing',
    description: 'Sustainable office and computing accessories',
    image: 'https://readdy.ai/api/search-image?query=Green%20computing%20accessories%20including%20bamboo%20laptop%20stands%2C%20ergonomic%20keyboard%20made%20from%20recycled%20materials%2C%20eco-friendly%20mouse%20pads%2C%20sustainable%20desk%20organizers%2C%20modern%20office%20setup%2C%20clean%20design&width=500&height=400&seq=cat-page-4&orientation=landscape',
    productCount: 38,
    usagePercent: 84,
    features: ['Ergonomic Design', 'Sustainable Materials', 'Productivity Focused', 'Durable Build']
  },
  {
    id: 5,
    name: 'Renewable Power Solutions',
    description: 'Clean energy solutions for everyday use',
    image: 'https://readdy.ai/api/search-image?query=Renewable%20power%20solutions%20including%20portable%20wind%20turbines%2C%20solar%20generators%2C%20clean%20energy%20storage%20devices%2C%20sustainable%20power%20technology%2C%20modern%20industrial%20design%2C%20professional%20photography&width=500&height=400&seq=cat-page-5&orientation=landscape',
    productCount: 21,
    usagePercent: 68,
    features: ['High Capacity', 'Multiple Outputs', 'Clean Energy', 'Portable Design']
  },
  {
    id: 6,
    name: 'Sustainable Audio',
    description: 'Eco-friendly headphones and speakers',
    image: 'https://readdy.ai/api/search-image?query=Sustainable%20audio%20equipment%20made%20from%20recycled%20materials%2C%20bamboo%20headphones%2C%20eco-friendly%20bluetooth%20speakers%2C%20natural%20wood%20finish%2C%20modern%20audio%20design%2C%20professional%20product%20photography&width=500&height=400&seq=cat-page-6&orientation=landscape',
    productCount: 15,
    usagePercent: 81,
    features: ['Premium Sound', 'Comfort Fit', 'Long Battery', 'Eco Materials']
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Product Categories</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive range of sustainable technology products designed for environmentally conscious consumers
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm font-semibold text-gray-800">{category.productCount} Products</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                    <div className="flex items-center bg-green-50 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-700 font-semibold text-sm">{category.usagePercent}% Usage</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg">{category.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={`/products?category=${category.id}`}
                    className="inline-flex items-center justify-center w-full bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 font-semibold text-lg group cursor-pointer"
                  >
                    Explore Products
                    <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}