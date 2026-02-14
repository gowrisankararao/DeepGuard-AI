import { motion } from "framer-motion";
import { ArrowLeft, Code, Database, Brain, Shield, Layers, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Project Overview",
    icon: Globe,
    content: `DeepGuard AI is a web-based platform that detects whether images and videos were created by artificial intelligence or by humans. It uses advanced AI vision models to analyze uploaded media and provides a detailed confidence report with multi-dimensional analysis scores.`,
  },
  {
    title: "2. Frontend Technologies",
    icon: Code,
    content: `• **React 18** — Component-based UI library for building interactive interfaces
• **TypeScript** — JavaScript with type safety for better code quality
• **Vite** — Lightning-fast build tool and dev server
• **Tailwind CSS** — Utility-first CSS framework for rapid styling
• **shadcn/ui** — Beautifully designed, accessible UI components
• **Framer Motion** — Production-ready animation library
• **Lucide React** — Modern icon library
• **React Router** — Client-side routing and navigation
• **TanStack React Query** — Data fetching and caching
• **Sonner** — Toast notification system`,
  },
  {
    title: "3. Backend & Infrastructure",
    icon: Database,
    content: `• **Lovable Cloud** — Full-stack cloud platform with auto-scaling
• **Edge Functions** — Serverless functions running on Deno runtime
• **Secure API Gateway** — Protected endpoints with authentication tokens
• **CORS Configuration** — Cross-origin resource sharing for security`,
  },
  {
    title: "4. AI & Detection Engine",
    icon: Brain,
    content: `• **Google Gemini 2.5 Pro** — State-of-the-art vision AI model
• **Multi-dimensional Analysis** — Pattern, texture, metadata, and noise profiling
• **Real-time Processing** — In-memory analysis with no data retention
• **Confidence Scoring** — Percentage-based results with detailed breakdowns`,
  },
  {
    title: "5. How It Works (Step-by-Step)",
    icon: Layers,
    content: `**Step 1: Upload** — User drags & drops or selects an image/video file
**Step 2: Encoding** — File is converted to base64 and sent to the edge function
**Step 3: AI Analysis** — Gemini 2.5 Pro analyzes the media for AI generation patterns
**Step 4: Scoring** — The AI returns structured scores for pattern, texture, metadata, and noise
**Step 5: Results** — User receives a detailed report with confidence percentage and reasoning`,
  },
  {
    title: "6. Security & Privacy",
    icon: Shield,
    content: `• **Zero Data Retention** — Files are never stored on servers
• **In-Memory Processing** — All analysis happens in RAM
• **Encrypted Transit** — All uploads use HTTPS encryption
• **Generic Error Responses** — No sensitive data leaked in error messages
• **GDPR Compliant** — Follows international data protection standards`,
  },
  {
    title: "7. Key Features",
    icon: Zap,
    content: `• Drag-and-drop file upload with live preview
• Real-time analysis progress animation
• Detailed confidence score with 4-dimension breakdown
• Analysis history tracking
• Download and share results
• Responsive design for all devices
• Interactive particle background
• FAQ section for user guidance
• Professional testimonials section`,
  },
];

const Documentation = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Project <span className="text-primary">Documentation</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Complete technical guide for DeepGuard AI — from architecture to deployment.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground">{section.title}</h2>
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line prose prose-invert max-w-none">
                {section.content.split("**").map((part, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-foreground font-semibold">{part}</strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 glass rounded-2xl p-8 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Built by <span className="text-foreground font-semibold">Gowri Sankar</span> •{" "}
            <a
              href="https://github.com/gowrisankararao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>{" "}
            •{" "}
            <a
              href="https://www.linkedin.com/in/gowrisankararao/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default Documentation;
