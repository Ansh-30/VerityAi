import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 border-r border-white/10 bg-black/50 backdrop-blur-sm p-6">
      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className="block px-4 py-3 rounded-lg text-white hover:bg-blue-500/20 transition"
        >
          <span className="text-sm font-medium">📊 Dashboard</span>
        </Link>
        <Link
          to="/reviews"
          className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-blue-500/10 transition"
        >
          <span className="text-sm font-medium">⭐ Reviews</span>
        </Link>
        <Link
          to="/"
          className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-blue-500/10 transition"
        >
          <span className="text-sm font-medium">🏠 Home</span>
        </Link>
      </nav>
    </aside>
  );
}
