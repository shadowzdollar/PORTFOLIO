"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const posts = [
  {
    title: "Building 3D Experiences for the Web",
    excerpt: "How I used Three.js and React Three Fiber to create interactive 3D scenes that run smoothly in the browser.",
    date: "Aug 15, 2025",
    readTime: "8 min read",
    tags: ["Three.js", "WebGL"],
    pinned: true,
  },
  {
    title: "The Art of Crafting UI Components",
    excerpt: "Why treating your components like handcrafted furniture leads to better, more maintainable code.",
    date: "Jul 28, 2025",
    readTime: "5 min read",
    tags: ["React", "Design"],
    pinned: false,
  },
  {
    title: "Animations That Feel Natural",
    excerpt: "A deep dive into physics-based animations and the principles of natural motion in web interfaces.",
    date: "Jul 10, 2025",
    readTime: "12 min read",
    tags: ["Animation", "UX"],
    pinned: false,
  },
  {
    title: "From Blender to Browser: 3D Workflow",
    excerpt: "The complete pipeline for getting your Blender models into a web app — from export to optimization.",
    date: "Jun 22, 2025",
    readTime: "10 min read",
    tags: ["3D", "Blender"],
    pinned: false,
  },
];

function BlogCard({
  post,
  index,
  isInView,
}: {
  post: (typeof posts)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`wood-card p-6 relative group cursor-pointer transition-all duration-300 hover:shadow-wood-lg hover:-translate-y-1 ${
        post.pinned ? "ring-2 ring-wood-300" : ""
      }`}
    >
      {/* Pin decoration */}
      {post.pinned && (
        <div className="absolute -top-2 right-6">
          <div className="pin-tack" />
          <div className="text-[10px] text-wood-400 text-center mt-1 font-medium">
            Pinned
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex gap-2 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-wood-50 text-wood-500 text-xs rounded border border-wood-100 font-mono"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl font-bold text-wood-900 mb-2 group-hover:text-wood-700 transition-colors leading-snug">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-wood-600 text-sm leading-relaxed mb-4">
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-wood-400">
        <span>{post.date}</span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {post.readTime}
        </span>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-wood-500 to-wood-400 rounded-b-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.article>
  );
}

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <h2 className="section-heading mb-4">From the Workshop</h2>
            <p className="section-subheading">
              Thoughts, tutorials, and stories from the workbench.
            </p>
          </div>
          <a
            href="#"
            className="craft-button-outline text-sm shrink-0"
          >
            View All Posts →
          </a>
        </motion.div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
