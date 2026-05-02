import { useEffect, useState } from 'react';

const TOKEN_KEY = 'authToken';
const AUTH_EVENT = 'auth-change';

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const saveAuthToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const useAuthState = () => {
  const [token, setToken] = useState(getAuthToken());

  useEffect(() => {
    const handler = () => setToken(getAuthToken());
    window.addEventListener(AUTH_EVENT, handler);
    return () => window.removeEventListener(AUTH_EVENT, handler);
  }, []);

  return {
    token,
    isAuthenticated: Boolean(token),
  };
};
