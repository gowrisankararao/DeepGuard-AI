import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Forensics Analyst",
    text: "DeepGuard AI has become essential in our verification workflow. The accuracy and speed are unmatched.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Content Moderator",
    text: "We process thousands of images daily. DeepGuard catches AI-generated content that other tools miss completely.",
    rating: 5,
  },
  {
    name: "Dr. Aisha Patel",
    role: "AI Researcher",
    text: "The multi-model detection approach is brilliant. It stays ahead of the latest generation techniques.",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="py-32 px-6">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Trusted by <span className="text-accent">Professionals</span>
        </h2>
        <p className="text-muted-foreground text-lg">What our users say about DeepGuard AI</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-7 relative"
          >
            <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-4 h-4 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
            <div>
              <p className="font-display font-bold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
