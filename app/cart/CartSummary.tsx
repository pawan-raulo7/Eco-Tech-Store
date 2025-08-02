'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cartService } from '../../lib/cart';
import { authService } from '../../lib/auth';

export default function CartSummary() {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [user, setUser] = useState(authService.getCurrentUser());

  const shipping = cartTotal > 2000 ? 0 : 199; // Free shipping over ₹2000
  const tax = cartTotal * 0.18; // 18% GST
  const discount = promoDiscount;
  const total = cartTotal + shipping + tax - discount;

  useEffect(() => {
    updateCartTotal();
    
    const handleCartUpdate = () => {
      updateCartTotal();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const updateCartTotal = () => {
    setCartTotal(cartService.getCartTotal());
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    if (code === 'RECYCLE20') {
      setAppliedPromo(code);
      setPromoDiscount(cartTotal * 0.20);
      setPromoCode('');
    } else if (code === 'ECO500') {
      setAppliedPromo(code);
      setPromoDiscount(500);
      setPromoCode('');
    } else if (code === 'GREEN15') {
      setAppliedPromo(code);
      setPromoDiscount(cartTotal * 0.15);
      setPromoCode('');
    } else {
      alert('Invalid promo code. Try: RECYCLE20, ECO500, or GREEN15');
    }
  };

  const removePromo = () => {
    setAppliedPromo('');
    setPromoDiscount(0);
  };

  if (cartTotal === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            Shipping {cartTotal > 2000 && <span className="text-green-600 text-sm">(Free over ₹2000)</span>}
          </span>
          <span className="font-semibold text-gray-900">
            {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax (GST 18%)</span>
          <span className="font-semibold text-gray-900">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Discount ({appliedPromo})</span>
            <span>-₹{discount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center text-xl font-bold text-gray-900">
          <span>Total</span>
          <span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Promo Code</label>
        {!appliedPromo ? (
          <div className="flex gap-3">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Enter code"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={applyPromoCode}
              disabled={!promoCode}
              className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-colors font-semibold whitespace-nowrap cursor-pointer"
            >
              Apply
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
            <div className="flex items-center text-green-700">
              <i className="ri-check-line w-5 h-5 flex items-center justify-center mr-2"></i>
              <span className="font-semibold">{appliedPromo} applied</span>
            </div>
            <button
              onClick={removePromo}
              className="text-green-600 hover:text-green-700 cursor-pointer"
            >
              <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        )}
        
        {/* Available promo codes hint */}
        <div className="mt-3 text-xs text-gray-500">
          <p>Available codes: RECYCLE20 (20% off), ECO500 (₹500 off), GREEN15 (15% off)</p>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="space-y-4 mb-6">
        <div className="bg-green-50 p-4 rounded-xl">
          <div className="flex items-center text-green-700 mb-2">
            <i className="ri-leaf-line w-5 h-5 flex items-center justify-center mr-2"></i>
            <span className="font-semibold">Carbon Neutral Shipping</span>
          </div>
          <p className="text-sm text-green-600">Your order will be delivered with zero carbon footprint!</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center text-blue-700 mb-2">
            <i className="ri-recycle-line w-5 h-5 flex items-center justify-center mr-2"></i>
            <span className="font-semibold">Recycled Packaging</span>
          </div>
          <p className="text-sm text-blue-600">All packaging materials are made from recycled content</p>
        </div>
      </div>

      {/* Checkout Button */}
      {user ? (
        <Link
          href="/checkout"
          className="w-full bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl cursor-pointer block text-center"
        >
          Proceed to Checkout
        </Link>
      ) : (
        <div className="space-y-3">
          <Link
            href="/login?redirect=/checkout"
            className="w-full bg-green-600 text-white py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl cursor-pointer block text-center"
          >
            Login to Checkout
          </Link>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-green-600 hover:text-green-700 font-semibold">
              Sign up here
            </Link>
          </p>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">Secure frontend-only demo checkout</p>
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-gray-100 px-3 py-1 rounded text-xs font-semibold text-gray-700">Demo Mode</div>
          <div className="bg-gray-100 px-3 py-1 rounded text-xs font-semibold text-gray-700">Local Storage</div>
        </div>
      </div>
    </div>
  );
}