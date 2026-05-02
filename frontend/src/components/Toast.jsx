import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../hooks/useToast';

const variantStyles = {
  info: 'from-slate-700 to-slate-900 border-slate-600 text-slate-100',
  success: 'from-emerald-500/20 to-slate-900 border-emerald-400 text-emerald-200',
  error: 'from-rose-500/15 to-slate-900 border-rose-400 text-rose-100',
};

export default function Toasts() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex flex-col items-center gap-3 px-4 sm:px-6">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`pointer-events-auto w-full max-w-md rounded-3xl border bg-gradient-to-br ${variantStyles[toast.variant]} p-4 shadow-[0_20px_120px_-40px_rgba(59,130,246,0.45)]`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm leading-6">{toast.message}</p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-full bg-slate-900/70 px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-800"
              >
                close
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
