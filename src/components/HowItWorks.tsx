import { motion } from "framer-motion";
import { Brain, Layers, Search, Shield } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Upload & Scan",
    description: "Our system ingests your media and extracts thousands of features from texture, noise, and metadata.",
    color: "text-primary",
    glow: "glow-cyan",
    bg: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "Neural Analysis",
    description: "Multiple deep learning models analyze patterns unique to AI generation — artifacts invisible to the human eye.",
    color: "text-secondary",
    glow: "glow-purple",
    bg: "bg-secondary/10",
  },
  {
    icon: Layers,
    title: "Cross-Reference",
    description: "Results are cross-referenced across our database of known AI generation signatures from all major models.",
    color: "text-accent",
    glow: "glow-green",
    bg: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Confidence Report",
    description: "You receive a detailed confidence score with breakdown across multiple analysis dimensions.",
    color: "text-neon-pink",
    glow: "",
    bg: "bg-neon-pink/10",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-32 px-6">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          How It <span className="text-secondary text-glow-purple">Works</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our multi-layered AI detection pipeline ensures the highest accuracy
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -4 }}
            className={`glass rounded-2xl p-8 transition-all duration-300 hover:${step.glow}`}
          >
            <div className={`w-14 h-14 rounded-xl ${step.bg} flex items-center justify-center mb-5`}>
              <step.icon className={`w-7 h-7 ${step.color}`} />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
              <h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
