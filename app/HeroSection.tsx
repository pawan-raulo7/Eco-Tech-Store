'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section 
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Modern%20sustainable%20smart%20home%20with%20solar%20panels%2C%20green%20technology%20devices%2C%20eco-friendly%20minimalist%20interior%20design%2C%20natural%20lighting%2C%20plants%2C%20clean%20energy%20systems%2C%20contemporary%20architecture%20with%20environmental%20consciousness%2C%20bright%20and%20airy%20atmosphere&width=1920&height=1080&seq=hero-1&orientation=landscape')`
      }}
    >
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Sustainable Tech for a 
              <span className="text-green-400"> Greener Future</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Discover eco-friendly smart home products and sustainable tech accessories that reduce your environmental footprint while enhancing your digital lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold text-center whitespace-nowrap cursor-pointer">
                Shop Now
              </Link>
              <Link href="/about" className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors text-lg font-semibold text-center whitespace-nowrap cursor-pointer">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button className="text-white animate-bounce">
          <i className="ri-arrow-down-line w-6 h-6 flex items-center justify-center"></i>
        </button>
      </div>
    </section>
  );
}