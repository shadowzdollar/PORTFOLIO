"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { HandDrawnButton, HandDrawnUnderline, HandDrawnCard } from "./HandDrawn";
import { useSound } from "./AmbientSound";
import { useTimeOfDay } from "./TimeOfDay";

const categories = ["All", "Web", "3D", "Mobile", "Design"];

const projects = [
  {
    title: "Crafted Commerce",
    description: "An e-commerce platform with a handcrafted feel. Built with Next.js, Stripe, and custom animations.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    category: "Web",
    color: "from-amber-600 to-orange-700",
    emoji: "🛒",
  },
  {
    title: "Woodland Explorer",
    description: "An interactive 3D forest experience using Three.js with procedural tree generation.",
    tags: ["Three.js", "WebGL", "GLSL"],
    category: "3D",
    color: "from-green-600 to-emerald-800",
    emoji: "🌲",
  },
  {
    title: "Mindful Notes",
    description: "A beautifully minimal note-taking app with handwriting support and paper aesthetic.",
    tags: ["React", "Canvas API", "PWA"],
    category: "Mobile",
    color: "from-blue-500 to-indigo-700",
    emoji: "📝",
  },
  {
    title: "Artisan Dashboard",
    description: "A real-time analytics dashboard for small businesses with custom data visualizations.",
    tags: ["D3.js", "React", "Node.js"],
    category: "Web",
    color: "from-purple-600 to-violet-800",
    emoji: "📊",
  },
  {
    title: "Portfolio Kit",
    description: "An open-source portfolio template with 3D scenes and wooden aesthetic.",
    tags: ["Next.js", "Three.js", "Tailwind"],
    category: "Design",
    color: "from-amber-500 to-yellow-700",
    emoji: "🎨",
  },
  {
    title: "Sound Workshop",
    description: "A web-based audio synthesizer with a vintage hardware interface.",
    tags: ["Web Audio API", "React", "Canvas"],
    category: "Web",
    color: "from-rose-500 to-pink-700",
    emoji: "🎛️",
  },
];

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { playClick, playHover } = useSound();
  const time = useTimeOfDay();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => {
        setIsHovered(true);
        playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => playClick()}
      className="group cursor-pointer"
    >
      <HandDrawnCard className="overflow-hidden transition-all duration-500 hover:shadow-wood-lg hover:-translate-y-1">
        {/* Color header */}
        <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center`}>
          <motion.span
            animate={isHovered ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="text-6xl select-none"
          >
            {project.emoji}
          </motion.span>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
            {project.category}
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-serif text-xl font-bold mb-2 group-hover:opacity-80 transition-colors" style={{ color: time.textColor }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 opacity-70" style={{ color: time.textColor }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-wood-50 text-wood-600 text-xs rounded-md border border-wood-200 font-mono">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-wood-500 group-hover:text-wood-700 transition-colors text-sm font-medium">
            View Project
            <motion.svg animate={isHovered ? { x: 4 } : { x: 0 }} className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </div>
        </div>
      </HandDrawnCard>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const { playClick, playHover } = useSound();
  const time = useTimeOfDay();

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 wood-texture opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: time.textColor }}>
            Projects
          </h2>
          <HandDrawnUnderline width={100} color={time.accentColor} />
          <p className="text-lg md:text-xl max-w-2xl mt-4 leading-relaxed opacity-70" style={{ color: time.textColor }}>
            A selection of work from my workshop — each piece built with care.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playClick();
              }}
              onMouseEnter={() => playHover()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-wood-600 text-cream-50 shadow-wood"
                  : "bg-cream-50 text-wood-600 border border-wood-200 hover:bg-wood-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <HandDrawnButton onClick={() => playClick()}>
            Want to see more? Let&apos;s chat →
          </HandDrawnButton>
        </motion.div>
      </div>
    </section>
  );
}
