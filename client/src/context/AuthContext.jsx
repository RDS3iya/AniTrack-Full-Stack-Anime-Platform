import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);
const INACTIVITY_LIMIT = 3 * 60 * 60 * 1000;
const TOKEN_REFRESH_INTERVAL = 10 * 60 * 1000;
const LAST_ACTIVITY_KEY = 'lastActivity';
const LAST_REFRESH_KEY = 'lastTokenRefresh';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const logoutTimer = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    localStorage.removeItem(LAST_REFRESH_KEY);
    setUser(null);
  }, []);

  const sessionExpired = useCallback(() => {
    const lastActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY) || 0);
    return lastActivity && Date.now() - lastActivity >= INACTIVITY_LIMIT;
  }, []);

  const scheduleLogout = useCallback(() => {
    window.clearTimeout(logoutTimer.current);
    const lastActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY) || Date.now());
    const remaining = Math.max(0, INACTIVITY_LIMIT - (Date.now() - lastActivity));
    logoutTimer.current = window.setTimeout(logout, remaining);
  }, [logout]);

  const refreshToken = useCallback(async () => {
    try {
      const data = await api('/auth/refresh', { method: 'POST' });
      localStorage.setItem('token', data.token);
      localStorage.setItem(LAST_REFRESH_KEY, String(Date.now()));
    } catch {
      logout();
    }
  }, [logout]);

  const recordActivity = useCallback(() => {
    if (!localStorage.getItem('token')) return;
    if (sessionExpired()) {
      logout();
      return;
    }

    const now = Date.now();
    const lastRefresh = Number(localStorage.getItem(LAST_REFRESH_KEY) || 0);
    localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
    scheduleLogout();

    if (now - lastRefresh >= TOKEN_REFRESH_INTERVAL) refreshToken();
  }, [logout, refreshToken, scheduleLogout, sessionExpired]);

  useEffect(() => {
    if (!user || !localStorage.getItem('token')) return undefined;

    if (!localStorage.getItem(LAST_ACTIVITY_KEY)) {
      localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      localStorage.setItem(LAST_REFRESH_KEY, String(Date.now()));
    }

    if (sessionExpired()) {
      logout();
      return undefined;
    }

    scheduleLogout();
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((eventName) => window.addEventListener(eventName, recordActivity, { passive: true }));
    window.addEventListener('focus', recordActivity);

    return () => {
      window.clearTimeout(logoutTimer.current);
      events.forEach((eventName) => window.removeEventListener(eventName, recordActivity));
      window.removeEventListener('focus', recordActivity);
    };
  }, [logout, recordActivity, scheduleLogout, sessionExpired, user]);

  async function authenticate(mode, values) {
    const data = await api(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(values) });
    const now = Date.now();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
    localStorage.setItem(LAST_REFRESH_KEY, String(now));
    setUser(data.user);
  }

  return <AuthContext.Provider value={{ user, authenticate, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
