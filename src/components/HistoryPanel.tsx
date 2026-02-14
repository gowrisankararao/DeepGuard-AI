import { motion } from "framer-motion";
import { Clock, Bot, User, Trash2 } from "lucide-react";
import type { UploadResult } from "./UploadSection";

interface HistoryPanelProps {
  history: UploadResult[];
  onClear: () => void;
}

const HistoryPanel = ({ history, onClear }: HistoryPanelProps) => (
  <section id="history" className="py-32 px-6">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Analysis <span className="text-accent text-glow-cyan">History</span>
        </h2>
        <p className="text-muted-foreground text-lg">Your previously analyzed files</p>
      </motion.div>

      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-12 text-center"
        >
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="text-muted-foreground">No analyses yet. Upload a file above to get started.</p>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={onClear}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Clear History
            </button>
          </div>
          <div className="space-y-3">
            {history.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                  {item.fileType === "image" ? (
                    <img src={item.preview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      ▶
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">{item.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.timestamp.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {item.isAI ? (
                    <Bot className="w-4 h-4 text-neon-pink" />
                  ) : (
                    <User className="w-4 h-4 text-accent" />
                  )}
                  <span className={`text-sm font-bold ${item.isAI ? "text-neon-pink" : "text-accent"}`}>
                    {item.confidence}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  </section>
);

export default HistoryPanel;
