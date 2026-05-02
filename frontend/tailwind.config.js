export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(79, 70, 229, 0.08), 0 35px 120px rgba(79, 70, 229, 0.16)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(99,102,241,0.18), transparent 35%), radial-gradient(circle at right, rgba(59,130,246,0.18), transparent 25%)',
      },
    },
  },
  plugins: [],
};
