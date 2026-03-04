import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Slow-moving gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.035]"
        style={{
          background: "radial-gradient(circle, hsl(187 71% 65%) 0%, transparent 70%)",
          top: "-15%",
          left: "-20%",
        }}
        animate={{
          x: [0, 250, 100, 300, 0],
          y: [0, 150, 300, 80, 0],
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, hsl(187 60% 50%) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-15%",
        }}
        animate={{
          x: [0, -200, -80, -200, 0],
          y: [0, -120, -220, -60, 0],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, hsl(187 80% 70%) 0%, transparent 70%)",
          top: "30%",
          left: "40%",
        }}
        animate={{
          x: [0, -120, 150, -80, 0],
          y: [0, 80, -80, 120, 0],
        }}
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: `hsl(187 71% 65% / ${0.08 + (i % 4) * 0.03})`,
            left: `${5 + i * 8}%`,
            top: `${10 + (i * 17) % 75}%`,
          }}
          animate={{
            y: [0, -(20 + i * 5), 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.05, 0.3, 0.05],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Horizontal light streaks */}
      <motion.div
        className="absolute h-px w-[400px] opacity-[0.06]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(187 71% 65%), transparent)",
          top: "25%",
          left: "-15%",
        }}
        animate={{ x: ["-15%", "115%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-px w-[250px] opacity-[0.04]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(187 80% 70%), transparent)",
          top: "55%",
          right: "-10%",
        }}
        animate={{ x: ["110%", "-10%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-px w-[300px] opacity-[0.05]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(187 60% 50%), transparent)",
          top: "80%",
          left: "-10%",
        }}
        animate={{ x: ["-10%", "120%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Diagonal subtle glow sweep */}
      <motion.div
        className="absolute w-[1px] h-[200px] opacity-[0.04] rotate-45"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(187 71% 65%), transparent)",
          top: "10%",
          left: "20%",
        }}
        animate={{
          y: ["-100%", "500%"],
          x: ["-50%", "300%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
