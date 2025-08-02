'use client';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  category: string;
}

class CartService {
  private storageKey = 'ecotech_cart';

  getCartItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const cartData = localStorage.getItem(this.storageKey);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart from localStorage:', error);
      return [];
    }
  }

  addToCart(product: Omit<CartItem, 'quantity'>): void {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
  }

  updateQuantity(productId: number, quantity: number): void {
    const cartItems = this.getCartItems();
    
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = quantity;
      localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
    }
  }

  removeFromCart(productId: number): void {
    const cartItems = this.getCartItems();
    const filteredItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  getCartCount(): number {
    return this.getCartItems().reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

export const cartService = new CartService();