import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import your Pages
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Reservations from '../pages/Reservations';
import Events from '../pages/Event';
import Cafe from '../pages/Cafe';
import Auth from '../pages/Auth';
import Admin from '../pages/Admin';

// Protected Route wrapper — redirects to /auth if not logged in
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="text-red-600 font-black italic uppercase tracking-widest animate-pulse">Loading...</p>
    </div>
  );
  return user ? children : <Navigate to="/auth" replace />;
};

// Guest Route wrapper — redirects to / if already logged in
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="text-red-600 font-black italic uppercase tracking-widest animate-pulse">Loading...</p>
    </div>
  );
  return !user ? children : <Navigate to="/" replace />;
};

// Admin Route wrapper — redirects to / if not admin
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="text-red-600 font-black italic uppercase tracking-widest animate-pulse">Loading...</p>
    </div>
  );
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* AUTH FIRST — Guest only (redirects to home if already logged in) */}
      <Route path="/auth" element={
        <GuestRoute>
          <Auth />
        </GuestRoute>
      } />

      {/* Landing Page — Public */}
      <Route path="/" element={<Home />} />

      {/* Admin Panel — Admin only */}
      <Route path="/admin" element={
        <AdminRoute>
          <Admin />
        </AdminRoute>
      } />

      {/* Protected Routes — must be logged in */}
      <Route path="/menu" element={
        <ProtectedRoute>
          <Menu />
        </ProtectedRoute>
      } />

      <Route path="/reservations" element={
        <ProtectedRoute>
          <Reservations />
        </ProtectedRoute>
      } />

      <Route path="/events" element={
        <ProtectedRoute>
          <Events />
        </ProtectedRoute>
      } />

      <Route path="/cafe" element={
        <ProtectedRoute>
          <Cafe />
        </ProtectedRoute>
      } />

      {/* 404 Error Page */}
      <Route path="*" element={
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-9xl font-black italic text-zinc-900 absolute opacity-50 select-none">404</h1>
          <div className="relative z-10">
            <h2 className="text-4xl font-black italic uppercase text-white mb-4">You're Lost, Homie.</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-8">This corner of the bodega doesn't exist.</p>
            <a href="/" className="px-8 py-3 bg-red-600 text-white font-black italic rounded-xl hover:bg-red-500 transition-all shadow-xl shadow-red-900/20">
              BACK TO BASE
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;