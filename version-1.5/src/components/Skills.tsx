"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "⚡",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Three.js / WebGL", level: 80 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    title: "Backend",
    icon: "🔧",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "Python", level: 75 },
      { name: "PostgreSQL", level: 82 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 72 },
    ],
  },
  {
    title: "Tools & Design",
    icon: "🎨",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 78 },
      { name: "CI/CD", level: 80 },
      { name: "Blender / 3D", level: 65 },
    ],
  },
];

const techStack = [
  { name: "Next.js", icon: "▲" },
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Tailwind", icon: "🎨" },
  { name: "Three.js", icon: "🧊" },
  { name: "Node.js", icon: "💚" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Prisma", icon: "💎" },
  { name: "Vercel", icon: "▲" },
  { name: "Docker", icon: "🐳" },
  { name: "Figma", icon: "🖌️" },
  { name: "Blender", icon: "🟧" },
];

function SkillBar({
  name,
  level,
  delay,
  isInView,
}: {
  name: string;
  level: number;
  delay: number;
  isInView: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-wood-700 font-medium">{name}</span>
        <span className="text-wood-400 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-2 bg-wood-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-wood-500 to-wood-400 rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-cream-100/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="section-heading mb-4">Skills & Tools</h2>
          <p className="section-subheading">
            The tools in my workshop — honed over years of building, breaking,
            and rebuilding.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              className="wood-panel p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-serif text-xl font-bold text-wood-800">
                  {cat.title}
                </h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.5 + (catIndex * 0.15) + (i * 0.08)}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="font-serif text-2xl font-bold text-wood-800 text-center mb-8">
            Technologies I Work With
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="wood-card p-4 flex flex-col items-center gap-2 cursor-default group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {tech.icon}
                </span>
                <span className="text-xs text-wood-600 font-medium text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
