'use client';

import { useState } from 'react';
import { orderService, Order } from '../../lib/orders';

export default function OrderTracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      // Find order by tracking number
      const allOrders = JSON.parse(localStorage.getItem('ecotech_orders') || '[]');
      const foundOrder = allOrders.find((o: Order) => 
        o.trackingNumber === trackingNumber.toUpperCase() || o.id === trackingNumber.toUpperCase()
      );

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found. Please check your tracking number.');
        setOrder(null);
      }
      setLoading(false);
    }, 1000);
  };

  const getTrackingSteps = (order: Order) => {
    const baseSteps = [
      {
        id: 1,
        name: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared',
        completed: true,
        date: new Date(order.createdAt).toLocaleDateString('en-IN')
      },
      {
        id: 2,
        name: 'Processing',
        description: 'Your recycled products are being prepared for shipment',
        completed: ['shipped', 'delivered'].includes(order.status),
        current: order.status === 'processing',
        date: order.status !== 'processing' ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN') : ''
      },
      {
        id: 3,
        name: 'Shipped',
        description: 'Your order is on its way with carbon-neutral delivery',
        completed: order.status === 'delivered',
        current: order.status === 'shipped',
        date: order.status === 'shipped' || order.status === 'delivered' ? 
          new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN') : ''
      },
      {
        id: 4,
        name: 'Delivered',
        description: 'Order delivered successfully',
        completed: order.status === 'delivered',
        current: false,
        date: order.status === 'delivered' ? new Date().toLocaleDateString('en-IN') : ''
      }
    ];

    return baseSteps;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Track Your Order</h3>
        <p className="text-gray-600">Enter your tracking number or order ID to track your recycled products</p>
      </div>

      {/* Tracking Form */}
      <div className="bg-gray-50 rounded-3xl p-8">
        <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="trackingNumber" className="block text-sm font-semibold text-gray-700 mb-3">
              Tracking Number or Order ID
            </label>
            <input
              id="trackingNumber"
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              placeholder="Enter tracking number (e.g. TRK123456) or Order ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 disabled:bg-gray-400 transition-colors font-semibold cursor-pointer"
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>
      </div>

      {/* Tracking Results */}
      {order && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Order Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Order {order.id}</h4>
                <p className="text-green-100">Tracking Number: {order.trackingNumber}</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <span className={`px-4 py-2 rounded-full font-semibold text-white bg-white/20`}>
                  <span className="capitalize">{order.status}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Tracking Progress */}
            <div className="mb-8">
              <h5 className="text-xl font-bold text-gray-900 mb-6">Delivery Progress</h5>
              
              <div className="relative">
                {getTrackingSteps(order).map((step, index) => (
                  <div key={step.id} className="flex items-start mb-8 last:mb-0">
                    <div className="flex flex-col items-center mr-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        step.completed 
                          ? 'bg-green-600 border-green-600 text-white'
                          : step.current
                          ? 'border-green-600 text-green-600 bg-white'
                          : 'border-gray-300 text-gray-400 bg-white'
                      }`}>
                        {step.completed ? (
                          <i className="ri-check-line w-5 h-5 flex items-center justify-center"></i>
                        ) : (
                          step.id
                        )}
                      </div>
                      {index < getTrackingSteps(order).length - 1 && (
                        <div className={`w-0.5 h-16 mt-2 ${
                          step.completed ? 'bg-green-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className={`font-bold ${
                          step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.name}
                        </h6>
                        {step.date && (
                          <span className="text-sm text-gray-500">{step.date}</span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        step.completed || step.current ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                      {step.current && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                            Current Status
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h6 className="font-bold text-gray-900 mb-3">Delivery Address</h6>
                <p className="text-gray-600">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
                  {order.shippingAddress.phone}
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h6 className="font-bold text-gray-900 mb-3">Delivery Information</h6>
                {order.estimatedDelivery && (
                  <p className="text-gray-600 mb-2">
                    <strong>Estimated Delivery:</strong><br />
                    {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                <p className="text-gray-600">
                  <strong>Delivery Method:</strong><br />
                  Carbon-neutral shipping with recycled packaging
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h6 className="font-bold text-gray-900 mb-4">Items in this Order</h6>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <h6 className="font-bold text-green-800 mb-2">Environmental Impact</h6>
              <div className="flex items-center justify-center text-green-700 mb-2">
                <i className="ri-leaf-line w-5 h-5 flex items-center justify-center mr-2"></i>
                <span>Carbon-neutral delivery with sustainable packaging</span>
              </div>
              <p className="text-sm text-green-600">
                Thank you for choosing recycled products and supporting environmental sustainability!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Demo Instructions */}
      {!order && (
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center">
          <h4 className="font-bold text-blue-800 mb-4">Demo Instructions</h4>
          <p className="text-blue-700 mb-4">
            This is a frontend-only demo. To test order tracking:
          </p>
          <ol className="text-blue-700 text-left max-w-md mx-auto space-y-2">
            <li>1. Place an order first by adding items to cart and checking out</li>
            <li>2. After completing checkout, you'll get a tracking number</li>
            <li>3. Use that tracking number or order ID to track your order here</li>
            <li>4. Your order data is stored locally in your browser</li>
          </ol>
        </div>
      )}
    </div>
  );
}