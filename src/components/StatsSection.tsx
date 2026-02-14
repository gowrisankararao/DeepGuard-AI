import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { label: "Files Analyzed", value: 2500000, suffix: "+", prefix: "" },
  { label: "Accuracy Rate", value: 99.2, suffix: "%", prefix: "" },
  { label: "AI Models Detected", value: 50, suffix: "+", prefix: "" },
  { label: "Response Time", value: 2.1, suffix: "s", prefix: "<" },
];

const AnimatedNumber = ({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  const display = target >= 1000000
    ? `${(count / 1000000).toFixed(1)}M`
    : target >= 1000
    ? `${(count / 1000).toFixed(0)}K`
    : target % 1 !== 0
    ? count.toFixed(1)
    : Math.floor(count).toString();

  return (
    <motion.div
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      <span className="font-display text-4xl md:text-5xl font-bold text-foreground">
        {prefix}{display}{suffix}
      </span>
    </motion.div>
  );
};

const StatsSection = () => (
  <section className="py-24 px-6">
    <div className="container mx-auto max-w-5xl">
      <div className="glass rounded-3xl p-10 md:p-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection;
