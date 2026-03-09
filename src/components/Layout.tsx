import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedRoute from "./AnimatedRoute";
import useCardHoverEffect from "@/hooks/useCardHoverEffect";

export default function Layout() {
  useCardHoverEffect();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col relative z-10">
      <Navbar />
      <main className="flex-1 pt-28">
        <AnimatePresence mode="wait">
          <AnimatedRoute key={location.pathname}>
            <Outlet />
          </AnimatedRoute>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
