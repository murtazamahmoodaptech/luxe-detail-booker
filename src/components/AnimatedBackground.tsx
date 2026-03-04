import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Slow-moving gradient orbs */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, hsl(187 71% 65%) 0%, transparent 70%)",
          top: "-10%",
          left: "-15%",
        }}
        animate={{
          x: [0, 200, 50, 200, 0],
          y: [0, 100, 200, 50, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, hsl(187 60% 50%) 0%, transparent 70%)",
          bottom: "-5%",
          right: "-10%",
        }}
        animate={{
          x: [0, -150, -50, -150, 0],
          y: [0, -80, -160, -40, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.025]"
        style={{
          background: "radial-gradient(circle, hsl(187 80% 70%) 0%, transparent 70%)",
          top: "40%",
          left: "50%",
        }}
        animate={{
          x: [0, -100, 100, -50, 0],
          y: [0, 60, -60, 80, 0],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/10"
          style={{
            left: `${10 + i * 11}%`,
            top: `${15 + (i * 13) % 70}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0.05, 0.25, 0.05],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}

      {/* Subtle moving line */}
      <motion.div
        className="absolute h-px w-[300px] opacity-[0.06]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(187 71% 65%), transparent)",
          top: "30%",
          left: "-10%",
        }}
        animate={{
          x: ["-10%", "110%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-px w-[200px] opacity-[0.04]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(187 71% 65%), transparent)",
          top: "65%",
          right: "-10%",
        }}
        animate={{
          x: ["110%", "-10%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
