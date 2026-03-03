import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, hsl(187 71% 65%) 0%, transparent 70%)",
          top: "10%",
          left: "-5%",
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, hsl(187 60% 50%) 0%, transparent 70%)",
          top: "50%",
          right: "-10%",
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, hsl(187 80% 70%) 0%, transparent 70%)",
          bottom: "5%",
          left: "30%",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(187 71% 65% / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(187 71% 65% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{
            left: `${(i * 7 + 5) % 100}%`,
            top: `${(i * 13 + 10) % 100}%`,
          }}
          animate={{
            y: [0, -30 - (i % 3) * 20, 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 5 + (i % 4) * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
