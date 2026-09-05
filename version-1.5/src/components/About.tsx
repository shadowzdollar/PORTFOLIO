"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HandDrawnCard, HandDrawnUnderline, RoughLine } from "./HandDrawn";
import { useSound } from "./AmbientSound";
import { useTimeOfDay } from "./TimeOfDay";

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "Creative Studio",
    period: "2022 — Present",
    description: "Building interactive web experiences with modern frameworks.",
  },
  {
    role: "UI/UX Developer",
    company: "Digital Agency",
    period: "2020 — 2022",
    description: "Designed and developed responsive interfaces for clients.",
  },
  {
    role: "Freelance Developer",
    company: "Self-employed",
    period: "2019 — 2020",
    description: "Delivered end-to-end web solutions for startups.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { playClick, playPageTurn } = useSound();
  const time = useTimeOfDay();

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: time.textColor }}>
            About Me
          </h2>
          <HandDrawnUnderline width={120} color={time.accentColor} />
          <p className="text-lg md:text-xl max-w-2xl mt-4 leading-relaxed opacity-70" style={{ color: time.textColor }}>
            A craftsman of code with an eye for design and a passion for creating
            things that feel alive on screen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Bio card — hand-drawn style */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={() => playPageTurn()}
          >
            <HandDrawnCard className="p-8" fillHachure>
              {/* Tape decoration */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-r from-yellow-100/80 via-yellow-50/90 to-yellow-100/80 border border-yellow-200/50 rotate-[-2deg] opacity-70" />

              <h3 className="font-serif text-2xl font-bold mb-4 mt-2" style={{ color: time.textColor }}>
                The Workshop Story
              </h3>
              <div className="space-y-4 leading-relaxed opacity-80" style={{ color: time.textColor }}>
                <p>
                  Hey there! I&apos;m a developer who believes in the craft of building
                  software. Just like a woodworker shapes raw timber into something
                  beautiful, I transform ideas into polished digital experiences.
                </p>
                <p>
                  My approach combines technical precision with creative expression.
                  Whether it&apos;s a complex web application or a simple landing page,
                  I pour attention into every detail.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring design patterns,
                  contributing to open source, or sketching ideas in my notebook.
                </p>
              </div>

              <RoughLine width={300} stroke={time.accentColor} className="my-6 opacity-50" />

              {/* Personality traits */}
              <div className="flex flex-wrap gap-2">
                {["Detail-oriented", "Creative", "Collaborative", "Curious", "Persistent"].map(
                  (trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1 text-sm rounded-full border border-wood-200 bg-wood-50 text-wood-700"
                    >
                      {trait}
                    </span>
                  )
                )}
              </div>
            </HandDrawnCard>
          </motion.div>

          {/* Right: Experience timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-serif text-xl font-bold mb-6" style={{ color: time.textColor }}>
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className="relative pl-6 border-l-2 border-wood-200 hover:border-wood-400 transition-colors"
                  onMouseEnter={() => playClick()}
                >
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-wood-500 border-2 border-cream-50" />

                  <HandDrawnCard className="p-5">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-wood-400 bg-wood-50 px-2 py-0.5 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="font-serif font-semibold" style={{ color: time.textColor }}>
                      {exp.role}
                    </h4>
                    <p className="text-sm text-wood-500 mb-2">{exp.company}</p>
                    <p className="text-sm opacity-70" style={{ color: time.textColor }}>{exp.description}</p>
                  </HandDrawnCard>
                </motion.div>
              ))}
            </div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8"
            >
              <HandDrawnCard className="p-6 text-center" fillHachure>
                <div className="text-4xl mb-2">🪵</div>
                <p className="text-sm italic opacity-70" style={{ color: time.textColor }}>
                  &ldquo;Good code is like good furniture — sturdy, functional, and a joy to use.&rdquo;
                </p>
              </HandDrawnCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
