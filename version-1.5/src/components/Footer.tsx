"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-wood-950 border-t border-wood-800" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-wood-700 flex items-center justify-center text-cream-50 font-serif font-bold text-sm">
              W
            </div>
            <span className="font-serif font-bold text-lg text-cream-200">
              Workshop
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-wood-400">
            <a href="#hero" className="hover:text-cream-200 transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-cream-200 transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-cream-200 transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-cream-200 transition-colors">
              Skills
            </a>
            <a href="#blog" className="hover:text-cream-200 transition-colors">
              Blog
            </a>
            <a href="#contact" className="hover:text-cream-200 transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-wood-500">
            © {currentYear} Workshop. Built with 🪵 and ☕
          </div>
        </motion.div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-wood-800/50 text-center">
          <p className="text-xs text-wood-600">
            Crafted with care using Next.js, Three.js, and a lot of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
