import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clearAuthToken, useAuthState } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export default function Navbar() {
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();
  const { notify } = useToast();

  const handleLogout = () => {
    clearAuthToken();
    notify('Logged out successfully.', 'success');
    navigate('/');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <img
            src="/logo.png"
            alt="Verity AI Logo"
            className="w-10 h-10 object-contain rounded-xl"
          />

          <span className="font-semibold text-white hidden sm:inline text-lg">
            Verity AI
          </span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="text-sm px-4 py-2 rounded-full border border-blue-500/50 text-white hover:bg-blue-500/10 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-full border border-red-500/50 text-red-400 hover:bg-red-500/10 transition"
              >
                Logout
              </motion.button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}