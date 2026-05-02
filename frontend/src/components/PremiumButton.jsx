import { motion } from 'framer-motion';

const PremiumButton = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-8 py-4 font-semibold text-white rounded-full overflow-hidden group transition-all duration-300 ${className}`}
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-100 group-hover:opacity-90 transition-opacity" />

      {/* Glowing blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>

      {/* Shine effect */}
      <div className="absolute inset-0 -top-2 rounded-full bg-gradient-to-b from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
    </motion.button>
  );
};

export default PremiumButton;
