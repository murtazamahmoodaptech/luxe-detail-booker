import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Large slow-moving gradient orbs */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, hsl(187 71% 65%) 0%, transparent 70%)",
          top: "-20%",
          left: "-25%",
        }}
        animate={{
          x: [0, 300, 80, 350, 0],
          y: [0, 200, 400, 100, 0],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.035]"
        style={{
          background: "radial-gradient(circle, hsl(200 60% 55%) 0%, transparent 70%)",
          bottom: "-15%",
          right: "-20%",
        }}
        animate={{
          x: [0, -250, -60, -280, 0],
          y: [0, -180, -300, -80, 0],
        }}
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.025]"
        style={{
          background: "radial-gradient(circle, hsl(187 80% 70%) 0%, transparent 70%)",
          top: "25%",
          left: "35%",
        }}
        animate={{
          x: [0, -150, 200, -100, 0],
          y: [0, 120, -120, 180, 0],
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, hsl(170 50% 50%) 0%, transparent 70%)",
          top: "60%",
          left: "10%",
        }}
        animate={{
          x: [0, 180, 50, 220, 0],
          y: [0, -60, -180, -30, 0],
        }}
        transition={{ duration: 65, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting particles */}
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            background: `hsl(187 71% 65% / ${0.06 + (i % 5) * 0.025})`,
            left: `${3 + i * 6}%`,
            top: `${8 + (i * 13) % 80}%`,
          }}
          animate={{
            y: [0, -(30 + i * 6), 0],
            x: [0, (i % 2 === 0 ? 25 : -25), 0],
            opacity: [0.04, 0.35, 0.04],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: 5 + i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}

      {/* Horizontal light streaks */}
      <motion.div
        className="absolute h-px w-[500px] opacity-[0.07]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(187 71% 65%), transparent)",
          top: "20%",
          left: "-20%",
        }}
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-px w-[350px] opacity-[0.05]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(200 70% 60%), transparent)",
          top: "45%",
          right: "-15%",
        }}
        animate={{ x: ["115%", "-15%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-px w-[400px] opacity-[0.06]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(187 60% 50%), transparent)",
          top: "70%",
          left: "-15%",
        }}
        animate={{ x: ["-15%", "125%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-px w-[300px] opacity-[0.04]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(187 80% 70%), transparent)",
          top: "90%",
          right: "-10%",
        }}
        animate={{ x: ["110%", "-10%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />

      {/* Diagonal glow sweeps */}
      <motion.div
        className="absolute w-[1px] h-[250px] opacity-[0.05] rotate-45"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(187 71% 65%), transparent)",
          top: "5%",
          left: "15%",
        }}
        animate={{ y: ["-100%", "600%"], x: ["-50%", "400%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[1px] h-[200px] opacity-[0.04] -rotate-45"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(200 60% 55%), transparent)",
          top: "15%",
          right: "25%",
        }}
        animate={{ y: ["-100%", "500%"], x: ["50%", "-300%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 8 }}
      />

      {/* Pulsing ring */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border border-primary/[0.03]"
        style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
        animate={{ scale: [1, 2.5, 1], opacity: [0.03, 0, 0.03] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
