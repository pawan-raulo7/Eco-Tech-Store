'use client';

export default function SustainabilitySection() {
  const features = [
    {
      icon: 'ri-leaf-line',
      title: 'Carbon Neutral Shipping',
      description: 'All our deliveries are carbon neutral with eco-friendly packaging materials.'
    },
    {
      icon: 'ri-recycle-line',
      title: 'Recycled Materials',
      description: 'Products made from 80% recycled and sustainable materials.'
    },
    {
      icon: 'ri-plant-line',
      title: 'Tree Planting Program',
      description: 'We plant a tree for every order to offset environmental impact.'
    },
    {
      icon: 'ri-award-line',
      title: 'Certified Sustainable',
      description: 'All products meet international sustainability standards.'
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Commitment to Sustainability</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every product we sell contributes to a more sustainable future. Here's how we're making a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${feature.icon} w-10 h-10 flex items-center justify-center text-green-600 text-3xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600">Trees Planted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Recyclable Packaging</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">25,000+</div>
              <div className="text-gray-600">Happy Eco-Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}