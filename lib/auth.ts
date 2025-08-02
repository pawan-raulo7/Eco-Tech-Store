'use client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

class AuthService {
  private storageKey = 'ecotech_user';

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userData = localStorage.getItem(this.storageKey);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
      return null;
    }
  }

  async login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get stored users
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return { user: null, error: 'User not found' };
    }

    // In a real app, you'd verify the password hash
    // For demo purposes, we'll accept any password for existing users
    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt
    };

    localStorage.setItem(this.storageKey, JSON.stringify(userData));
    return { user: userData, error: null };
  }

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<{ user: User | null; error: string | null }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = this.getStoredUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === userData.email)) {
      return { user: null, error: 'User already exists with this email' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date().toISOString()
    };

    // Store user in users list
    users.push({ ...newUser, password: userData.password });
    localStorage.setItem('ecotech_users', JSON.stringify(users));

    // Set current user
    localStorage.setItem(this.storageKey, JSON.stringify(newUser));
    
    return { user: newUser, error: null };
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  private getStoredUsers(): any[] {
    try {
      const users = localStorage.getItem('ecotech_users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting stored users:', error);
      return [];
    }
  }
}

export const authService = new AuthService();