import { motion } from "framer-motion";
import { Zap, Globe, Lock, Cpu, BarChart3, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in under 3 seconds with our optimized neural pipeline.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Globe,
    title: "Multi-Format Support",
    description: "Analyze PNG, JPG, WEBP images and MP4, MOV video formats seamlessly.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Zero data retention. Files are processed in memory and never stored.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Cpu,
    title: "Multi-Model Detection",
    description: "Detects outputs from DALL-E, Midjourney, Stable Diffusion, and more.",
    color: "text-neon-pink",
    bg: "bg-neon-pink/10",
    border: "border-neon-pink/20",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Breakdown scores across pattern, texture, metadata, and noise analysis.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Clock,
    title: "Analysis History",
    description: "Track all your previous analyses in one place for easy reference.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
  },
];

const FeaturesShowcase = () => (
  <section id="features" className="py-32 px-6">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Powerful <span className="text-primary text-glow-cyan">Features</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to verify content authenticity with confidence
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`glass rounded-2xl p-7 border ${feature.border} transition-all duration-300 group cursor-default`}
          >
            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesShowcase;
