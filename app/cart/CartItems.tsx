'use client';

import { useState, useEffect } from 'react';
import { cartService, CartItem } from '../../lib/cart';

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCartItems();
    
    const handleStorageChange = () => {
      loadCartItems();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const loadCartItems = () => {
    setCartItems(cartService.getCartItems());
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    cartService.updateQuantity(id, newQuantity);
    loadCartItems();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: number) => {
    cartService.removeFromCart(id);
    loadCartItems();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl shadow-md"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Category: {item.category}</p>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold text-green-600">₹{item.price.toLocaleString('en-IN')}</span>
                  {item.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                  {item.originalPrice && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Save ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors rounded-l-xl cursor-pointer"
                      >
                        <i className="ri-subtract-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors rounded-r-xl cursor-pointer"
                      >
                        <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center cursor-pointer group"
                  >
                    <i className="ri-delete-bin-line w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-shopping-cart-line w-12 h-12 flex items-center justify-center text-gray-400"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
          <p className="text-gray-600 mb-8">Add some recycled products to get started!</p>
          <a href="/products" className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-colors font-semibold cursor-pointer">
            Shop Recycled Products
          </a>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-xl font-bold text-gray-900">
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="mt-4 text-sm text-green-600">
            <i className="ri-leaf-line w-4 h-4 flex items-center justify-center mr-1 inline-block"></i>
            You're helping reduce waste by shopping recycled products!
          </div>
        </div>
      )}
    </div>
  );
}