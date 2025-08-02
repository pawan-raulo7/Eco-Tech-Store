
// Stripe configuration for secure payments
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface PaymentData {
  amount: number;
  currency: string;
  payment_method: string;
  customer_email: string;
  shipping_address: any;
  order_items: any[];
}

// Create payment intent (this would typically be called from an API route)
export const createPaymentIntent = async (paymentData: PaymentData): Promise<PaymentIntent> => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Confirm payment
export const confirmPayment = async (paymentIntentId: string, paymentMethodData: any) => {
  try {
    const response = await fetch('/api/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_intent_id: paymentIntentId,
        payment_method_data: paymentMethodData,
      }),
    });

    if (!response.ok) {
      throw new Error('Payment confirmation failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

// UPI payment processing (for Indian market)
export const processUPIPayment = async (upiId: string, amount: number, orderId: string) => {
  try {
    // This would integrate with UPI payment gateways like Razorpay, PhonePe, etc.
    const response = await fetch('/api/process-upi-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        upi_id: upiId,
        amount,
        order_id: orderId,
      }),
    });

    if (!response.ok) {
      throw new Error('UPI payment processing failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing UPI payment:', error);
    throw error;
  }
};

// Validate payment details
export const validatePaymentData = (paymentData: any) => {
  const errors: string[] = [];

  if (paymentData.method === 'card') {
    if (!paymentData.cardNumber || paymentData.cardNumber.length < 13) {
      errors.push('Invalid card number');
    }
    if (!paymentData.expiryDate || !paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      errors.push('Invalid expiry date');
    }
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      errors.push('Invalid CVV');
    }
    if (!paymentData.nameOnCard || paymentData.nameOnCard.length < 2) {
      errors.push('Name on card is required');
    }
  }

  if (paymentData.method === 'upi') {
    if (!paymentData.upiId || !paymentData.upiId.includes('@')) {
      errors.push('Invalid UPI ID');
    }
  }

  return errors;
};

// Format currency for Indian market
export const formatCurrency = (amount: number, currency: string = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate taxes and fees
export const calculateOrderTotal = (subtotal: number) => {
  const shipping = subtotal > 2000 ? 0 : 199.99; // Free shipping above ₹2000
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total: Math.round(total)
  };
};
