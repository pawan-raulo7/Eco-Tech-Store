'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { orderService, Order } from '../../lib/orders';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      const foundOrder = orderService.getOrder(orderId);
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center text-red-600"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h2>
            <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
            <Link href="/" className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-colors font-semibold cursor-pointer">
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line w-12 h-12 flex items-center justify-center text-green-600"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for choosing recycled products! Your order has been successfully placed.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="font-bold text-green-800 mb-2">Order Number</h3>
              <p className="text-2xl font-mono text-green-700">{order.id}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <p className="text-green-100">Order placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            
            <div className="p-8">
              {/* Shipping Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h3>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="font-semibold text-gray-900">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  <p className="text-gray-600">{order.shippingAddress.address}</p>
                  <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                  <p className="text-gray-600">{order.shippingAddress.phone}</p>
                  <p className="text-gray-600">{order.shippingAddress.email}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-lg font-bold text-green-600">₹{item.price.toLocaleString('en-IN')} each</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center text-2xl font-bold text-gray-900">
                  <span>Total Amount:</span>
                  <span>₹{order.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              {/* Tracking Information */}
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 mb-2">Tracking Information</h3>
                <p className="text-blue-700 mb-2">
                  <strong>Tracking Number:</strong> {order.trackingNumber}
                </p>
                <p className="text-blue-700 mb-2">
                  <strong>Status:</strong> <span className="capitalize">{order.status}</span>
                </p>
                {order.estimatedDelivery && (
                  <p className="text-blue-700">
                    <strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>

              {/* Environmental Impact */}
              <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="font-bold text-green-800 mb-2">Environmental Impact</h3>
                <div className="flex items-center text-green-700 mb-2">
                  <i className="ri-leaf-line w-5 h-5 flex items-center justify-center mr-2"></i>
                  <span>Your order will be delivered carbon-neutral</span>
                </div>
                <div className="flex items-center text-green-700 mb-2">
                  <i className="ri-recycle-line w-5 h-5 flex items-center justify-center mr-2"></i>
                  <span>All packaging made from recycled materials</span>
                </div>
                <p className="text-sm text-green-600 mt-3">
                  Thank you for supporting sustainable shopping and helping reduce waste!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/orders"
                  className="flex-1 bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-colors font-bold text-center cursor-pointer"
                >
                  View All Orders
                </Link>
                <Link
                  href="/products"
                  className="flex-1 bg-white text-green-600 border-2 border-green-600 py-4 rounded-2xl hover:bg-green-50 transition-colors font-bold text-center cursor-pointer"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order confirmation...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}