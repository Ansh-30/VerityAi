export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 text-slate-100">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-blue-400" />
      <span className="text-sm">Loading...</span>
    </div>
  );
}
