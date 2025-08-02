
'use client';

import { useState } from 'react';

interface CheckoutFormProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  orderData: any;
  setOrderData: (data: any) => void;
}

export default function CheckoutForm({ 
  currentStep, 
  setCurrentStep, 
  orderData, 
  setOrderData 
}: CheckoutFormProps) {
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const [paymentForm, setPaymentForm] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    upiId: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderData({ ...orderData, shipping: shippingForm });
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Stripe payment processing
    setTimeout(() => {
      setOrderData({ ...orderData, payment: paymentForm });
      setCurrentStep(3);
      setIsProcessing(false);
    }, 2000);
  };

  const handleFinalOrder = async () => {
    setIsProcessing(true);
    
    // Process final order
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to order confirmation
      window.location.href = '/order-confirmation';
    }, 1500);
  };

  if (currentStep === 1) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
        
        <form onSubmit={handleShippingSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                required
                value={shippingForm.firstName}
                onChange={(e) => setShippingForm({...shippingForm, firstName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                required
                value={shippingForm.lastName}
                onChange={(e) => setShippingForm({...shippingForm, lastName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={shippingForm.email}
              onChange={(e) => setShippingForm({...shippingForm, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              required
              value={shippingForm.phone}
              onChange={(e) => setShippingForm({...shippingForm, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              required
              value={shippingForm.address}
              onChange={(e) => setShippingForm({...shippingForm, address: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="House no, Street name, Area"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <input
                type="text"
                required
                value={shippingForm.city}
                onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
              <input
                type="text"
                required
                value={shippingForm.state}
                onChange={(e) => setShippingForm({...shippingForm, state: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code</label>
            <input
              type="text"
              required
              value={shippingForm.pincode}
              onChange={(e) => setShippingForm({...shippingForm, pincode: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="6-digit PIN code"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-colors font-bold text-lg cursor-pointer"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
        
        <div className="mb-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setPaymentForm({...paymentForm, method: 'card'})}
              className={`flex-1 p-4 border-2 rounded-xl transition-colors ${
                paymentForm.method === 'card' ? 'border-green-600 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                <i className="ri-bank-card-line w-6 h-6 flex items-center justify-center mr-2"></i>
                <span className="font-semibold">Card Payment</span>
              </div>
            </button>
            <button
              onClick={() => setPaymentForm({...paymentForm, method: 'upi'})}
              className={`flex-1 p-4 border-2 rounded-xl transition-colors ${
                paymentForm.method === 'upi' ? 'border-green-600 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                <i className="ri-smartphone-line w-6 h-6 flex items-center justify-center mr-2"></i>
                <span className="font-semibold">UPI Payment</span>
              </div>
            </button>
          </div>
        </div>

        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          {paymentForm.method === 'card' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  required
                  value={paymentForm.cardNumber}
                  onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={paymentForm.expiryDate}
                    onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    required
                    value={paymentForm.cvv}
                    onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name on Card</label>
                <input
                  type="text"
                  required
                  value={paymentForm.nameOnCard}
                  onChange={(e) => setPaymentForm({...paymentForm, nameOnCard: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </>
          )}

          {paymentForm.method === 'upi' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID</label>
              <input
                type="text"
                required
                value={paymentForm.upiId}
                onChange={(e) => setPaymentForm({...paymentForm, upiId: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="yourname@paytm"
              />
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center text-blue-700">
              <i className="ri-shield-check-line w-5 h-5 flex items-center justify-center mr-2"></i>
              <span className="font-semibold">Secure Payment</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">Your payment information is encrypted and secure</p>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl hover:bg-gray-200 transition-colors font-bold cursor-pointer"
            >
              Back to Shipping
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 disabled:bg-gray-400 transition-colors font-bold cursor-pointer"
            >
              {isProcessing ? 'Processing...' : 'Review Order'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 mb-3">Shipping Address</h3>
            <p className="text-gray-600">
              {orderData.shipping.firstName} {orderData.shipping.lastName}<br />
              {orderData.shipping.address}<br />
              {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.pincode}<br />
              {orderData.shipping.phone}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 mb-3">Payment Method</h3>
            <div className="flex items-center">
              <i className={`${paymentForm.method === 'card' ? 'ri-bank-card-line' : 'ri-smartphone-line'} w-5 h-5 flex items-center justify-center mr-2`}></i>
              <span className="text-gray-600">
                {paymentForm.method === 'card' ? 
                  `Card ending in ${paymentForm.cardNumber.slice(-4)}` : 
                  `UPI: ${paymentForm.upiId}`
                }
              </span>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
            <div className="flex items-center text-green-700 mb-2">
              <i className="ri-leaf-line w-5 h-5 flex items-center justify-center mr-2"></i>
              <span className="font-semibold">Eco-Friendly Delivery</span>
            </div>
            <p className="text-sm text-green-600">
              Your order will be delivered carbon-neutral with sustainable packaging materials.
            </p>
          </div>

          <button
            onClick={handleFinalOrder}
            disabled={isProcessing}
            className="w-full bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 disabled:bg-gray-400 transition-colors font-bold text-lg cursor-pointer"
          >
            {isProcessing ? 'Processing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
