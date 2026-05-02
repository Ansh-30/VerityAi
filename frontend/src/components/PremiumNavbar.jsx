import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PremiumNavbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-cyan-500/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white text-lg group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
            V
          </div>
          <span className="font-bold text-white text-lg tracking-tight">Verity AI</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 text-white font-semibold rounded-full hover:text-cyan-300 transition-colors duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default PremiumNavbar;
