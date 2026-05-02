import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Toasts from './components/Toast';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Reviews from './pages/Reviews';
import { ToastProvider } from './hooks/useToast';
import { useAuthState } from './hooks/useAuth';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuthState();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const isFullPageRoute = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-black text-white">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={isFullPageRoute ? '' : 'px-4 pb-16 pt-28 sm:px-6 lg:px-8'}
          >
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/reviews"
                element={
                  <RequireAuth>
                    <Reviews />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.main>
        </AnimatePresence>

        <Toasts />
      </div>
    </ToastProvider>
  );
}

export default App;
