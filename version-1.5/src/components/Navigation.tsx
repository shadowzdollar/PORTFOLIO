"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoundControls } from "./AmbientSound";
import { TimeDisplay } from "./TimeOfDay";
import { useSound } from "./AmbientSound";

const navLinks = [
  { label: "Workshop", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream-50/90 backdrop-blur-md shadow-wood border-b border-wood-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo — hand-drawn style */}
          <a
            href="#hero"
            className="flex items-center gap-2 group"
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
          >
            <div className="w-8 h-8 rounded-lg bg-wood-600 flex items-center justify-center text-cream-50 font-serif font-bold text-sm group-hover:bg-wood-700 transition-colors">
              W
            </div>
            <span className="font-serif font-bold text-xl text-wood-900 hidden sm:block">
              Workshop
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="px-4 py-2 text-sm font-medium text-wood-700 hover:text-wood-900 hover:bg-wood-100 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Time + Sound + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <TimeDisplay />
            <SoundControls />
            <a
              href="#contact"
              className="px-5 py-2 bg-wood-600 text-cream-50 rounded-lg text-sm font-medium hover:bg-wood-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => playClick()}
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              playClick();
            }}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-wood-100 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-wood-800"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-wood-800"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-wood-800"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream-50/98 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    playClick();
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="font-serif text-2xl font-semibold text-wood-800 hover:text-wood-600 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 mt-4"
              >
                <TimeDisplay />
                <SoundControls />
              </motion.div>

              <motion.a
                href="#contact"
                onClick={() => {
                  setMobileOpen(false);
                  playClick();
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="px-6 py-3 bg-wood-600 text-cream-50 rounded-lg font-medium hover:bg-wood-700 transition-all"
              >
                Let&apos;s Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
