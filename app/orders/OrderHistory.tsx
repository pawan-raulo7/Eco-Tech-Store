'use client';

import { useState, useEffect } from 'react';
import { orderService, Order } from '../../lib/orders';
import { authService } from '../../lib/auth';
import { cartService } from '../../lib/cart';

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    if (user) {
      const userOrders = orderService.getUserOrders(user.id);
      // Sort orders by creation date (newest first)
      const sortedOrders = userOrders.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sortedOrders);
    }
    setLoading(false);
  }, [user]);

  const handleReorder = (order: Order) => {
    // Add all items from the order back to cart
    order.items.forEach(item => {
      cartService.addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: 'Electronics' // Default category since it's not stored in order items
      });
    });
    
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${order.items.length} items added to cart!`);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'ri-time-line';
      case 'shipped':
        return 'ri-truck-line';
      case 'delivered':
        return 'ri-check-line';
      case 'cancelled':
        return 'ri-close-line';
      default:
        return 'ri-information-line';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-user-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h3>
        <p className="text-gray-600 mb-8">Sign in to view your order history</p>
        <a href="/login" className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-colors font-semibold cursor-pointer">
          Sign In
        </a>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-shopping-bag-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h3>
        <p className="text-gray-600 mb-8">You haven't placed any orders. Start shopping for recycled products!</p>
        <a href="/products" className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-colors font-semibold cursor-pointer">
          Shop Now
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Order History</h3>
        <p className="text-gray-600">Track and manage your recycled product orders</p>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
          {/* Order Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Order {order.id}</h4>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <span className={`px-4 py-2 rounded-full font-semibold flex items-center ${getStatusColor(order.status)}`}>
                <i className={`${getStatusIcon(order.status)} w-4 h-4 flex items-center justify-center mr-2`}></i>
                <span className="capitalize">{order.status}</span>
              </span>
              <span className="text-2xl font-bold text-gray-900">₹{order.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 bg-white rounded-2xl p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900">{item.name}</h5>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-green-600 font-semibold">₹{item.price.toLocaleString('en-IN')} each</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tracking Info */}
          {order.trackingNumber && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-800">Tracking Number</p>
                  <p className="text-blue-700 font-mono">{order.trackingNumber}</p>
                </div>
                {order.estimatedDelivery && (
                  <div className="text-right">
                    <p className="font-semibold text-blue-800">Estimated Delivery</p>
                    <p className="text-blue-700">
                      {new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleReorder(order)}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors font-semibold cursor-pointer flex items-center justify-center"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Reorder Items
            </button>
            {order.status === 'shipped' && (
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold cursor-pointer flex items-center justify-center">
                <i className="ri-truck-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Track Package
              </button>
            )}
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold cursor-pointer flex items-center justify-center">
              <i className="ri-file-text-line w-4 h-4 flex items-center justify-center mr-2"></i>
              View Invoice
            </button>
          </div>

          {/* Environmental Impact Note */}
          <div className="mt-4 text-center">
            <p className="text-sm text-green-600">
              <i className="ri-leaf-line w-4 h-4 flex items-center justify-center mr-1 inline-block"></i>
              This order supported recycling and reduced environmental waste
            </p>
          </div>
        </div>
      ))}

      {/* Order Summary */}
      <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
        <h4 className="text-xl font-bold text-green-800 mb-4">Your Impact Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold text-green-700">{orders.length}</p>
            <p className="text-green-600">Orders Placed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-700">
              {orders.reduce((total, order) => total + order.items.reduce((sum, item) => sum + item.quantity, 0), 0)}
            </p>
            <p className="text-green-600">Recycled Products Bought</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-700">
              ₹{orders.reduce((total, order) => total + order.total, 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-green-600">Total Investment in Sustainability</p>
          </div>
        </div>
      </div>
    </div>
  );
}