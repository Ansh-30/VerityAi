import { motion } from 'framer-motion';

export default function Button({ children, className = '', onClick, type = 'button', disabled = false }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/50 bg-black px-8 py-3 text-sm font-semibold text-white transition duration-300 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 to-blue-500/0 hover:from-blue-500/10 hover:to-blue-500/10 transition duration-300"></span>
      <span className="relative">{children}</span>
    </motion.button>
  );
}
