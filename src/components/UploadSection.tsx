import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image, Video, X, Loader2, Sparkles } from "lucide-react";

interface UploadResult {
  fileName: string;
  fileType: string;
  preview: string;
  isAI: boolean;
  confidence: number;
  patternAnalysis: number;
  textureCheck: number;
  metadataScan: number;
  noiseProfile: number;
  reasoning: string;
  timestamp: Date;
}

interface UploadSectionProps {
  onResult: (result: UploadResult) => void;
}

const UploadSection = ({ onResult }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type.startsWith("image/") || f.type.startsWith("video/"))) {
      handleFile(f);
    }
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const analyzeFile = async () => {
    if (!file || !preview) return;
    setAnalyzing(true);
    setProgress(0);

    // Animate progress while waiting for AI
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + Math.random() * 5 + 1));
    }, 200);

    try {
      // Extract base64 data from data URL
      const base64Data = preview.split(",")[1];

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-media`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            imageBase64: base64Data,
            mimeType: file.type,
            fileName: file.name,
          }),
        }
      );

      clearInterval(interval);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Analysis failed");
      }

      const result = await response.json();
      setProgress(100);

      setTimeout(() => {
        setAnalyzing(false);
        onResult({
          fileName: file.name,
          fileType: file.type.startsWith("image/") ? "image" : "video",
          preview,
          isAI: result.isAI,
          confidence: result.confidence,
          patternAnalysis: result.patternAnalysis,
          textureCheck: result.textureCheck,
          metadataScan: result.metadataScan,
          noiseProfile: result.noiseProfile,
          reasoning: result.reasoning || "",
          timestamp: new Date(),
        });
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setAnalyzing(false);
      setProgress(0);
      console.error("Analysis error:", err);
      alert(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
    setAnalyzing(false);
  };

  return (
    <section id="upload" className="py-32 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Upload & <span className="text-primary text-glow-cyan">Analyze</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Drop an image or video to detect AI-generated content
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`glass rounded-2xl p-12 border-2 border-dashed transition-all duration-300 cursor-pointer text-center ${
                  isDragging
                    ? "border-primary glow-cyan bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold text-lg mb-1">
                        Drag & drop your file here
                      </p>
                      <p className="text-muted-foreground text-sm">
                        or click to browse — supports images and videos
                      </p>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground glass rounded-full px-3 py-1">
                        <Image className="w-3 h-3" /> PNG, JPG, WEBP
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground glass rounded-full px-3 py-1">
                        <Video className="w-3 h-3" /> MP4, MOV
                      </span>
                    </div>
                  </div>
                </label>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass rounded-2xl p-6 relative"
              >
                <button
                  onClick={clearFile}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-destructive/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative rounded-xl overflow-hidden mb-6 aspect-video bg-muted/30">
                  {file.type.startsWith("image/") ? (
                    <img src={preview!} alt="Preview" className="w-full h-full object-contain" />
                  ) : (
                    <video src={preview!} className="w-full h-full object-contain" controls />
                  )}
                  {analyzing && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-spin-slow" />
                        <div className="absolute inset-2 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">{Math.min(Math.floor(progress), 100)}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-medium text-sm">{file.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={analyzeFile}
                    disabled={analyzing}
                    className="inline-flex items-center gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary font-semibold px-6 py-3 rounded-xl glow-cyan transition-all disabled:opacity-50"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze
                      </>
                    )}
                  </motion.button>
                </div>

                {analyzing && (
                  <div className="mt-4">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Neural network analyzing content patterns...
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;
export type { UploadResult };
