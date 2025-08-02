
'use client';

const orderItems = [
  {
    id: 1,
    name: 'EcoCharge Solar Power Bank 20000mAh',
    price: 2399.99,
    quantity: 2,
    image: 'https://readdy.ai/api/search-image?query=Premium%20solar%20power%20bank%20with%20sleek%20design%2C%20portable%20solar%20charging%20device%2C%20sustainable%20technology%2C%20modern%20minimalist%20style%2C%20clean%20product%20photography%2C%20white%20background%2C%20professional%20lighting%2C%20eco-friendly%20materials%20visible&width=60&height=60&seq=summary-1&orientation=squarish'
  },
  {
    id: 2,
    name: 'Smart Bamboo Wireless Charger',
    price: 1899.99,
    quantity: 1,
    image: 'https://readdy.ai/api/search-image?query=Elegant%20bamboo%20wireless%20charging%20pad%2C%20natural%20wood%20finish%2C%20modern%20sustainable%20design%2C%20smartphone%20charging%20wirelessly%2C%20eco-friendly%20materials%2C%20minimal%20aesthetic%2C%20clean%20white%20background%2C%20professional%20product%20shot&width=60&height=60&seq=summary-2&orientation=squarish'
  },
  {
    id: 3,
    name: 'Recycled Ocean Plastic Phone Case',
    price: 1299.99,
    quantity: 1,
    image: 'https://readdy.ai/api/search-image?query=Sustainable%20phone%20case%20made%20from%20recycled%20ocean%20plastic%2C%20protective%20smartphone%20cover%2C%20eco-friendly%20materials%2C%20modern%20design%2C%20clear%20protective%20features%2C%20clean%20background%2C%20professional%20product%20photography&width=60&height=60&seq=summary-3&orientation=squarish'
  }
];

export default function OrderSummary() {
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 199.99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{item.name}</h3>
              <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
            </div>
            <span className="font-bold text-green-600">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">₹{shipping.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax (GST 18%)</span>
          <span className="font-semibold">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total</span>
          <span className="text-green-600">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-xl">
          <div className="flex items-center text-green-700 mb-2">
            <i className="ri-truck-line w-5 h-5 flex items-center justify-center mr-2"></i>
            <span className="font-semibold">Free Returns</span>
          </div>
          <p className="text-sm text-green-600">30-day hassle-free returns</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center text-blue-700 mb-2">
            <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center mr-2"></i>
            <span className="font-semibold">Secure Payment</span>
          </div>
          <p className="text-sm text-blue-600">SSL encrypted transactions</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl">
          <div className="flex items-center text-purple-700 mb-2">
            <i className="ri-award-line w-5 h-5 flex items-center justify-center mr-2"></i>
            <span className="font-semibold">Warranty Included</span>
          </div>
          <p className="text-sm text-purple-600">1-year manufacturer warranty</p>
        </div>
      </div>
    </div>
  );
}
