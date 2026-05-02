import { motion } from 'framer-motion';

export default function Input({ label, type = 'text', value, onChange, placeholder, rows, name }) {
  return (
    <motion.label className="grid gap-2 text-sm font-medium text-slate-200" whileHover={{ y: -1 }}>
      <span className="text-slate-300">{label}</span>
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="min-h-[140px] rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-4 text-sm text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30"
        />
      )}
    </motion.label>
  );
}
