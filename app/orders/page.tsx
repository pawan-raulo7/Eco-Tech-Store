'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderHistory from './OrderHistory';
import OrderTracking from './OrderTracking';
import { useState } from 'react';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">My Orders</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Track your orders and view your purchase history
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-8 py-6 text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'history'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className={`px-8 py-6 text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'tracking'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Track Order
                </button>
              </nav>
            </div>
            
            <div className="p-8">
              {activeTab === 'history' ? <OrderHistory /> : <OrderTracking />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}