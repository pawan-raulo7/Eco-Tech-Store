'use client';

import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Smart Home Devices',
    description: 'Energy-efficient smart home automation',
    image: 'https://readdy.ai/api/search-image?query=Smart%20home%20devices%20collection%20including%20eco-friendly%20smart%20thermostat%2C%20LED%20lighting%20system%2C%20energy%20monitoring%20devices%2C%20sustainable%20materials%2C%20modern%20minimalist%20design%2C%20clean%20white%20background%2C%20professional%20product%20photography&width=400&height=300&seq=cat-1&orientation=landscape',
    productCount: 45
  },
  {
    id: 2,
    name: 'Solar Tech Accessories',
    description: 'Harness the power of renewable energy',
    image: 'https://readdy.ai/api/search-image?query=Solar%20powered%20tech%20accessories%20including%20portable%20solar%20chargers%2C%20solar%20power%20banks%2C%20sustainable%20solar%20panels%20for%20devices%2C%20eco-friendly%20technology%2C%20clean%20modern%20design%2C%20bright%20natural%20lighting%2C%20simple%20background&width=400&height=300&seq=cat-2&orientation=landscape',
    productCount: 32
  },
  {
    id: 3,
    name: 'Eco Phone Accessories',
    description: 'Sustainable cases and chargers',
    image: 'https://readdy.ai/api/search-image?query=Eco-friendly%20phone%20accessories%20made%20from%20sustainable%20materials%2C%20biodegradable%20phone%20cases%2C%20bamboo%20wireless%20chargers%2C%20recycled%20plastic%20accessories%2C%20green%20technology%20products%2C%20clean%20minimal%20styling%2C%20professional%20lighting&width=400&height=300&seq=cat-3&orientation=landscape',
    productCount: 28
  },
  {
    id: 4,
    name: 'Green Computing',
    description: 'Sustainable laptop and desktop accessories',
    image: 'https://readdy.ai/api/search-image?query=Green%20computing%20accessories%20including%20bamboo%20laptop%20stands%2C%20recycled%20plastic%20keyboards%2C%20eco-friendly%20mouse%20pads%2C%20sustainable%20desk%20organizers%2C%20energy-efficient%20computer%20peripherals%2C%20modern%20office%20setup%2C%20clean%20background&width=400&height=300&seq=cat-4&orientation=landscape',
    productCount: 38
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collection of sustainable technology products designed for the environmentally conscious consumer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.productCount} products</span>
                  <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center text-green-600 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}