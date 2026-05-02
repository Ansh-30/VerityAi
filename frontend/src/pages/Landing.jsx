import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-5xl mx-auto space-y-8"
        >
          {/* Main Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              <span className="text-white">Detect Fake</span>
              <br />
              <span className="text-white">News</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">Instantly</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Advanced AI-powered fake news detection platform. Get instant credibility scores for any article.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="pt-8">
            <Button onClick={() => navigate('/login')} className="text-lg px-10 py-4">
              Get Started →
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 sm:gap-12 pt-12 border-t border-white/10"
          >
            {[
              { number: '99.2%', label: 'Accuracy' },
              { number: '<1s', label: 'Detection' },
              { number: '10M+', label: 'Analyzed' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">{stat.number}</div>
                <div className="text-gray-500 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16"
          >
            Why Choose Verity AI?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Real-time analysis in under 1 second' },
              { icon: '🎯', title: 'Highly Accurate', desc: '99.2% accuracy with advanced AI' },
              { icon: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and protected' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 rounded-lg border border-blue-500/30 bg-blue-500/5 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}