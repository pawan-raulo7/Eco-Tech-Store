'use client';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  estimatedDelivery?: string;
  trackingNumber?: string;
}

class OrderService {
  private storageKey = 'ecotech_orders';

  getUserOrders(userId: string): Order[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const ordersData = localStorage.getItem(this.storageKey);
      const allOrders: Order[] = ordersData ? JSON.parse(ordersData) : [];
      return allOrders.filter(order => order.userId === userId);
    } catch (error) {
      console.error('Error getting orders from localStorage:', error);
      return [];
    }
  }

  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'trackingNumber' | 'estimatedDelivery'>): Order {
    const newOrder: Order = {
      ...order,
      id: `ORD${Date.now()}`,
      createdAt: new Date().toISOString(),
      trackingNumber: `TRK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    };

    const allOrders = this.getAllOrders();
    allOrders.push(newOrder);
    localStorage.setItem(this.storageKey, JSON.stringify(allOrders));

    return newOrder;
  }

  getOrder(orderId: string): Order | null {
    const allOrders = this.getAllOrders();
    return allOrders.find(order => order.id === orderId) || null;
  }

  private getAllOrders(): Order[] {
    try {
      const ordersData = localStorage.getItem(this.storageKey);
      return ordersData ? JSON.parse(ordersData) : [];
    } catch (error) {
      console.error('Error getting all orders:', error);
      return [];
    }
  }

  // Mock order status updates
  updateOrderStatus(orderId: string, status: Order['status']): void {
    const allOrders = this.getAllOrders();
    const orderIndex = allOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      allOrders[orderIndex].status = status;
      localStorage.setItem(this.storageKey, JSON.stringify(allOrders));
    }
  }
}

export const orderService = new OrderService();