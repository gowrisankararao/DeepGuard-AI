import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does DeepGuard AI detect AI-generated content?",
    a: "DeepGuard AI uses Google's Gemini 2.5 Pro vision model combined with multi-layered analysis including pattern recognition, texture analysis, metadata scanning, and noise profiling to determine if content was created by AI.",
  },
  {
    q: "What file formats are supported?",
    a: "We support all major image formats (PNG, JPG, JPEG, WEBP, GIF) and video formats (MP4, MOV). Simply drag and drop or click to upload your file.",
  },
  {
    q: "Is my uploaded content stored on your servers?",
    a: "No. All files are processed in-memory and never stored. We follow a strict zero-retention policy. Your data remains yours.",
  },
  {
    q: "How accurate is the detection?",
    a: "Our system achieves over 99% accuracy on known AI generation models including DALL-E, Midjourney, Stable Diffusion, and others. Accuracy may vary with new or unknown models.",
  },
  {
    q: "Can it detect deepfake videos?",
    a: "Yes, DeepGuard AI can analyze video frames to detect signs of AI generation or manipulation, including deepfakes created by popular tools.",
  },
  {
    q: "Is there an API available?",
    a: "We're working on a public API for developers. Join our community for updates on availability and documentation.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-32 px-6">
    <div className="container mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
          <HelpCircle className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Got Questions?</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Frequently Asked <span className="text-secondary text-glow-purple">Questions</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass rounded-xl px-6 border-none"
            >
              <AccordionTrigger className="text-foreground font-medium text-left hover:text-primary hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
