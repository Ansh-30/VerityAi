import { motion } from 'framer-motion';

export default function Card({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm transition duration-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
