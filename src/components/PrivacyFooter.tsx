import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, Sparkles, Github, Linkedin, Mail, Heart } from "lucide-react";

const PrivacySection = () => (
  <section id="privacy" className="py-32 px-6">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your Privacy, <span className="text-accent">Protected</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We take security and privacy seriously. Your data is safe with us.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Lock, title: "End-to-End Encryption", desc: "All uploads are encrypted in transit and at rest." },
          { icon: Eye, title: "No Data Retention", desc: "Files are processed in memory and never stored on our servers." },
          { icon: Server, title: "GDPR Compliant", desc: "Fully compliant with international data protection regulations." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative py-16 px-6 mt-16 border-t border-border/50">
    {/* Gradient glow behind footer */}
    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
    
    <div className="container mx-auto max-w-5xl relative z-10">
      {/* Top section */}
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Deep<span className="text-primary">Guard</span> <span className="text-secondary">AI</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Advanced AI content detection powered by neural networks. Protecting authenticity in the age of AI.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Upload & Analyze", href: "#upload" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Analysis History", href: "#history" },
              { label: "Privacy & Security", href: "#privacy" },
              { label: "Documentation", href: "/docs" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-display font-bold text-foreground mb-4">Connect With Us</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Follow us for updates and AI detection insights.
          </p>
          <div className="flex gap-3">
            <motion.a
              href="https://www.linkedin.com/in/gowrisankararao/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:glow-cyan transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://github.com/gowrisankararao"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:contact@deepguard.ai"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 hover:glow-green transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground/60 text-xs flex items-center gap-1">
          © 2026 DeepGuard AI. Built with <Heart className="w-3 h-3 text-destructive inline" /> by Gowri Sankar
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">API Docs</a>
        </div>
      </div>
    </div>
  </footer>
);

export { PrivacySection, Footer };
