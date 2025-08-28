import { useState, useEffect } from 'react';
import { User as AppUser } from '../types';
import { apiClient } from '../lib/api';

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const data = await apiClient.getCurrentUser();
      setUser(data.user);
      setProfile(data.user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      apiClient.clearToken();
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const data = await apiClient.register(email, password, name);
    setUser(data.user);
    setProfile(data.user);
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const data = await apiClient.login(email, password);
    setUser(data.user);
    setProfile(data.user);
    return data;
  };

  const signOut = async () => {
    apiClient.logout();
    setUser(null);
    setProfile(null);
    window.location.href = '/';
  };

  const updateProfile = async (updates: Partial<AppUser>) => {
    const data = await apiClient.updateProfile(updates);
    setProfile(data.user);
    return data.user;
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };
}