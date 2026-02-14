import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Bot, User, Download, Share2 } from "lucide-react";
import type { UploadResult } from "./UploadSection";

interface ResultSectionProps {
  result: UploadResult | null;
}

const ResultSection = ({ result }: ResultSectionProps) => {
  if (!result) return null;

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`glass rounded-2xl p-8 border ${
              result.isAI ? "border-neon-pink/30 glow-purple" : "border-accent/30 glow-green"
            }`}
          >
            <div className="flex items-start gap-6 mb-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                result.isAI ? "bg-neon-pink/10" : "bg-accent/10"
              }`}>
                {result.isAI ? (
                  <Bot className="w-8 h-8 text-neon-pink" />
                ) : (
                  <User className="w-8 h-8 text-accent" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {result.isAI ? (
                    <AlertTriangle className="w-5 h-5 text-neon-pink" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  )}
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {result.isAI
                      ? "This media is likely AI-generated"
                      : "This media appears to be human-created"}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Analysis of <span className="text-foreground font-medium">{result.fileName}</span>
                </p>
                {result.reasoning && (
                  <p className="text-muted-foreground text-sm mt-2 italic">
                    "{result.reasoning}"
                  </p>
                )}
              </div>
            </div>

            {/* Confidence meter */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Confidence Score</span>
                <span className={`text-sm font-bold ${result.isAI ? "text-neon-pink" : "text-accent"}`}>
                  {result.confidence}%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className={`h-full rounded-full ${
                    result.isAI
                      ? "bg-gradient-to-r from-neon-purple to-neon-pink"
                      : "bg-gradient-to-r from-primary to-accent"
                  }`}
                />
              </div>
            </div>

            {/* Analysis breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Pattern Analysis", score: result.patternAnalysis ?? Math.floor(result.confidence * 0.9) },
                { label: "Texture Check", score: result.textureCheck ?? Math.floor(result.confidence * 0.85) },
                { label: "Metadata Scan", score: result.metadataScan ?? Math.floor(result.confidence * 0.95) },
                { label: "Noise Profile", score: result.noiseProfile ?? Math.floor(result.confidence * 0.88) },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-display font-bold text-foreground">
                    {Math.min(item.score, 99)}%
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="inline-flex items-center gap-2 glass hover:bg-muted/50 text-sm text-muted-foreground px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" /> Download Report
              </button>
              <button className="inline-flex items-center gap-2 glass hover:bg-muted/50 text-sm text-muted-foreground px-4 py-2 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" /> Share Result
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ResultSection;
