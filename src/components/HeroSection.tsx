import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";

const Navbar = () => (
  <motion.nav
    initial={{ y: -80 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="fixed top-0 left-0 right-0 z-50 glass-strong"
  >
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-primary" />
        <span className="font-display text-xl font-bold text-foreground">
          Deep<span className="text-primary">Guard</span> <span className="text-secondary">AI</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {["Features", "Upload", "How It Works", "FAQ", "Privacy"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  </motion.nav>
);

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
    {/* Radial glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial opacity-60 pointer-events-none" />
    <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative z-10 text-center max-w-4xl"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
        className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
        <span className="text-sm text-muted-foreground">AI Detection Engine v2.0</span>
      </motion.div>

      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
        <span className="text-foreground">Detect </span>
        <span className="text-primary text-glow-cyan">AI-Generated</span>
        <br />
        <span className="text-foreground">Content </span>
        <span className="text-secondary text-glow-purple">Instantly</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        Upload any image or video and our advanced neural network will analyze whether
        it was created by AI or a human — with precision and confidence.
      </p>

      <motion.a
        href="#upload"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary font-semibold px-8 py-4 rounded-xl glow-cyan transition-all duration-300 text-lg"
      >
        <Sparkles className="w-5 h-5" />
        Start Analyzing
      </motion.a>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-16"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground mx-auto" />
      </motion.div>
    </motion.div>
  </section>
);

export { Navbar, HeroSection };
