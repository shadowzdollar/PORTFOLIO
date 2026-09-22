'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* ── Page content ────────────────────────────────────────── */

function CoverPage({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open the book"
      className="relative block w-full h-full overflow-hidden text-left cursor-pointer group"
      style={{ background: 'radial-gradient(130% 95% at 30% 10%, #4A3226 0%, #2E2018 55%, #1B120C 100%)' }}
    >
      {/* Leather grain texture */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(118deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 4px)' }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.45) 100%)' }} />

      {/* Embossed double border */}
      <div className="absolute inset-6 md:inset-9 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(212,175,110,0.4), inset 0 0 0 3px rgba(0,0,0,0.3)' }} />
      <div className="absolute inset-9 md:inset-12 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(212,175,110,0.22)' }} />

      {/* Corner flourishes */}
      {[
        { top: '2.2rem', left: '2.2rem', rotate: '0deg' },
        { top: '2.2rem', right: '2.2rem', rotate: '90deg' },
        { bottom: '2.2rem', left: '2.2rem', rotate: '-90deg' },
        { bottom: '2.2rem', right: '2.2rem', rotate: '180deg' },
      ].map((pos, i) => (
        <svg key={i} className="absolute w-5 h-5 md:w-7 md:h-7 pointer-events-none opacity-60" style={{ ...pos, transform: `rotate(${pos.rotate})` }} viewBox="0 0 24 24" fill="none">
          <path d="M2 2 H14 M2 2 V14" stroke="#C9A468" strokeWidth="1" />
          <circle cx="2" cy="2" r="2.2" stroke="#C9A468" strokeWidth="1" fill="none" />
        </svg>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 md:px-12 text-center">
        <div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-105"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(212,175,110,0.55), inset 0 2px 6px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.06)' }}
        >
          <span
            className="font-serif text-xl md:text-2xl tracking-wider"
            style={{ color: 'transparent', backgroundImage: 'linear-gradient(180deg,#F3D9A4,#C9A468 55%,#8A6B3D)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
          >
            I·J
          </span>
        </div>

        <p className="font-mono text-[9px] md:text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#B99B6E' }}>Field Notes Of A</p>

        <h1
          className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-3"
          style={{ color: 'transparent', backgroundImage: 'linear-gradient(180deg,#F6E3B4 0%,#D9B876 45%,#9C7A44 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
        >
          Backend &amp;<br />AI/ML Engineer
        </h1>

        <div className="flex items-center gap-3 my-3">
          <div className="h-px w-8 md:w-10" style={{ background: 'linear-gradient(to right, transparent, #C9A468)' }} />
          <span style={{ color: '#C9A468' }} className="text-xs">✦</span>
          <div className="h-px w-8 md:w-10" style={{ background: 'linear-gradient(to left, transparent, #C9A468)' }} />
        </div>

        <p className="font-serif italic text-base md:text-lg" style={{ color: '#E7D2A0' }}>Igiraneza Joseph</p>
        <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: '#8A7350' }}>Kigali, Rwanda</p>
      </div>

      {/* Open hint */}
      <motion.div
        className="absolute bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[9px] md:text-[10px] tracking-[0.35em] uppercase pointer-events-none"
        style={{ color: '#C9A468' }}
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Open the book</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </motion.div>
    </button>
  );
}

function AboutPage() {
  return (
    <div className="w-full h-full overflow-y-auto bg-[#EFDFCA] px-8 md:px-14 py-10 relative">
      <div className="absolute inset-0 paper-texture pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/[0.04] to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-lg mx-auto">
        <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#9C6D48] mb-1">Chapter I</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#52392B] leading-tight mb-1">The Introduction</h2>
        <p className="font-[Caveat] text-sm text-[#AF9F90] italic mb-4">or, how I learned to love the terminal</p>
        <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-[#D3B293]" /><span className="text-[#D3B293] text-xs">✦</span><div className="flex-1 h-px bg-[#D3B293]" /></div>
        <div className="space-y-4 text-[#52392B] leading-relaxed text-[13px] md:text-sm">
          <p className="drop-cap">I've spent the better part of my career on the unglamorous side of technology — the backends that never see daylight, the data pipelines that hum quietly at 3am, the models that take hours to train and seconds to fail.</p>
          <p>My name is Joseph. I'm a backend engineer and AI/ML practitioner based in Rwanda. Over the years, I've worked on hundreds of projects — some ambitious, some humble, all teaching me something about building software that actually works.</p>
          <p>I don't subscribe to the idea that every problem needs a neural network. Sometimes a well-written query and a sensible data model will do just fine.</p>
          <div className="my-4 p-4 bg-[#EBD2B3] rounded border border-[#D3B293]">
            <p className="font-[Caveat] text-sm text-[#9C6D48] italic">"The best backend is the one nobody notices — until it's gone."</p>
          </div>
          <p>What I care about is making things that hold up. Systems that handle a thousand requests without breaking a sweat. Models that don't just work in a notebook but survive contact with production.</p>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center z-10"><span className="font-serif text-[10px] text-[#D3B293]">— 1 —</span></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/[0.04] to-transparent pointer-events-none" />
    </div>
  );
}

function SkillsPage() {
  const cats = [
    { title: 'Backend Architecture', desc: 'The plumbing that keeps everything running.', skills: ['Python', 'Go', 'Node.js', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Docker', 'Kubernetes', 'CI/CD'] },
    { title: 'AI & Machine Learning', desc: 'When data speaks and rules go quiet.', skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'LLM Integration', 'RAG Systems', 'Fine-tuning', 'Computer Vision', 'NLP', 'MLOps'] },
    { title: 'Infrastructure', desc: 'Deployment is not an afterthought.', skills: ['AWS', 'GCP', 'Linux', 'Nginx', 'Terraform', 'Prometheus', 'Grafana', 'Git'] },
  ];
  return (
    <div className="w-full h-full overflow-y-auto bg-[#EFDFCA] px-8 md:px-14 py-10 relative">
      <div className="absolute inset-0 paper-texture pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/[0.04] to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-lg mx-auto">
        <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#9C6D48] mb-1">Chapter II</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#52392B] leading-tight mb-1">The Toolkit</h2>
        <p className="font-[Caveat] text-sm text-[#AF9F90] italic mb-4">a working inventory, not a wish list</p>
        <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-[#D3B293]" /><span className="text-[#D3B293] text-xs">✦</span><div className="flex-1 h-px bg-[#D3B293]" /></div>
        <div className="space-y-6">
          {cats.map((c) => (
            <div key={c.title}>
              <h3 className="font-serif text-base font-semibold text-[#52392B] mb-1">{c.title}</h3>
              <p className="font-[Caveat] text-xs text-[#AF9F90] italic mb-2">{c.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.skills.map((s) => <span key={s} className="px-2 py-1 text-[10px] font-mono text-[#9C6D48] bg-[#EBD2B3] border border-[#D3B293] rounded">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center z-10"><span className="font-serif text-[10px] text-[#D3B293]">— 2 —</span></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/[0.04] to-transparent pointer-events-none" />
    </div>
  );
}

function ProjectsPage() {
  const projects = [
    { title: 'Distributed ML Pipeline', cat: 'AI/ML · Infra', desc: 'End-to-end pipeline for training and deploying computer vision models at scale.', stack: ['PyTorch', 'K8s', 'AWS', 'Go'], hl: '40% faster training' },
    { title: 'Fraud Detection System', cat: 'Backend · ML', desc: 'Low-latency fraud detection processing thousands of transactions per second.', stack: ['Python', 'FastAPI', 'XGBoost', 'Kafka'], hl: '< 50ms latency' },
    { title: 'RAG Document Intelligence', cat: 'AI/ML', desc: 'Retrieval-augmented generation for conversational Q&A across 100K+ documents.', stack: ['LangChain', 'Pinecone', 'FastAPI'], hl: '100K+ docs' },
    { title: 'Event Processing Platform', cat: 'Backend', desc: 'Distributed event processing with dead-letter queues and circuit breakers.', stack: ['Go', 'Kafka', 'MongoDB', 'Prometheus'], hl: '1M+ events/day' },
    { title: 'NLP for African Languages', cat: 'AI/ML · Research', desc: 'NLP tools for under-resourced African languages — tokenizers and fine-tuned models.', stack: ['Python', 'PyTorch', 'Hugging Face'], hl: '5+ languages' },
  ];
  return (
    <div className="w-full h-full overflow-y-auto bg-[#EFDFCA] px-8 md:px-14 py-10 relative">
      <div className="absolute inset-0 paper-texture pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/[0.04] to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-lg mx-auto">
        <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#9C6D48] mb-1">Chapter III</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#52392B] leading-tight mb-1">Selected Works</h2>
        <p className="font-[Caveat] text-sm text-[#AF9F90] italic mb-4">a curated selection from the archives</p>
        <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-[#D3B293]" /><span className="text-[#D3B293] text-xs">✦</span><div className="flex-1 h-px bg-[#D3B293]" /></div>
        <div className="space-y-4">
          {projects.map((p, i) => (
            <div key={p.title}>
              <p className="font-mono text-[8px] tracking-wider uppercase text-[#9C6D48] mb-0.5">{p.cat}</p>
              <h3 className="font-serif text-sm font-semibold text-[#52392B] mb-1">{p.title}</h3>
              <p className="text-[#52392B] text-[11px] leading-relaxed mb-1">{p.desc}</p>
              <p className="font-[Caveat] text-xs text-[#AF9F90] mb-1">→ {p.hl}</p>
              <div className="flex flex-wrap gap-1">
                {p.stack.map((t) => <span key={t} className="text-[9px] font-mono text-[#9C6D48] bg-[#EBD2B3] px-1.5 py-0.5 rounded">{t}</span>)}
              </div>
              {i < projects.length - 1 && <div className="flex items-center gap-2 my-3"><div className="flex-1 h-px bg-[#D3B293]" /><span className="text-[#D3B293] text-[8px]">·</span><div className="flex-1 h-px bg-[#D3B293]" /></div>}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center z-10"><span className="font-serif text-[10px] text-[#D3B293]">— 3 —</span></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/[0.04] to-transparent pointer-events-none" />
    </div>
  );
}

function ExperiencePage() {
  const exps = [
    { period: '2022 — Present', title: 'Senior Backend & AI/ML Engineer', org: 'Independent', desc: 'Building backend systems and ML pipelines for startups and enterprises.', current: true },
    { period: '2020 — 2022', title: 'AI/ML Engineer', org: 'Various Organizations', desc: 'NLP tools, computer vision models, and recommendation systems.' },
    { period: '2018 — 2020', title: 'Backend Developer', org: 'Tech Companies', desc: 'REST APIs, databases, and deployments. The devil is in the edge cases.' },
    { period: '2016 — 2018', title: 'Junior Developer', org: 'Early Career', desc: 'Python scripts that grew into real systems.' },
  ];
  return (
    <div className="w-full h-full overflow-y-auto bg-[#EFDFCA] px-8 md:px-14 py-10 relative">
      <div className="absolute inset-0 paper-texture pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/[0.04] to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-lg mx-auto">
        <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#9C6D48] mb-1">Chapter IV</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#52392B] leading-tight mb-1">The Journey</h2>
        <p className="font-[Caveat] text-sm text-[#AF9F90] italic mb-4">each chapter shaped the next</p>
        <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-[#D3B293]" /><span className="text-[#D3B293] text-xs">✦</span><div className="flex-1 h-px bg-[#D3B293]" /></div>
        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-[#D3B293]" />
          <div className="space-y-5">
            {exps.map((e) => (
              <div key={e.title} className="relative pl-9">
                <div className="absolute left-2 top-1.5 w-2 h-2 rounded-full border-2 border-[#9C6D48] bg-[#EFDFCA]" />
                <p className="font-mono text-[9px] tracking-wider text-[#9C6D48] mb-0.5">{e.period}{e.current && <span className="ml-1 text-[#9C6D48]">• current</span>}</p>
                <h3 className="font-serif text-sm font-semibold text-[#52392B] mb-0.5">{e.title}</h3>
                <p className="text-[#AF9F90] text-[10px] mb-0.5">{e.org}</p>
                <p className="text-[#52392B] text-[11px] leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center z-10"><span className="font-serif text-[10px] text-[#D3B293]">— 4 —</span></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/[0.04] to-transparent pointer-events-none" />
    </div>
  );
}

function ContactPage() {
  return (
    <div className="w-full h-full overflow-y-auto bg-[#EFDFCA] px-8 md:px-14 py-10 relative">
      <div className="absolute inset-0 paper-texture pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/[0.04] to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-lg mx-auto">
        <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#9C6D48] mb-1">Chapter V</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#52392B] leading-tight mb-1">Let's Talk</h2>
        <p className="font-[Caveat] text-sm text-[#AF9F90] italic mb-4">the start of another chapter</p>
        <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-[#D3B293]" /><span className="text-[#D3B293] text-xs">✦</span><div className="flex-1 h-px bg-[#D3B293]" /></div>
        <div className="space-y-4 text-[#52392B] text-[13px] md:text-sm leading-relaxed">
          <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of something meaningful.</p>
          <p>The best way to reach me is through email.</p>
        </div>
        <div className="space-y-3 mt-6">
          {[
            { label: 'Email', value: 'igiraneza.joseph@example.com' },
            { label: 'GitHub', value: 'github.com/igiraneza' },
            { label: 'LinkedIn', value: 'linkedin.com/in/igiraneza' },
          ].map((c) => (
            <div key={c.label} className="p-3 bg-[#EBD2B3] rounded-lg border border-[#D3B293]">
              <p className="text-[9px] text-[#9C6D48]">{c.label}</p>
              <p className="text-xs font-medium text-[#52392B]">{c.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#D3B293]" /><span className="text-[#D3B293] text-xs">✦</span><div className="h-px w-8 bg-[#D3B293]" />
          </div>
          <p className="font-[Caveat] text-sm text-[#AF9F90] italic">"Good software is like a good book."</p>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center z-10"><span className="font-serif text-[10px] text-[#D3B293]">— 5 —</span></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/[0.04] to-transparent pointer-events-none" />
    </div>
  );
}

/* ── Chapter labels (for the bookmark ribbon & page dots) ──── */
const chapterLabels = ['Cover', 'Chapter I', 'Chapter II', 'Chapter III', 'Chapter IV', 'Chapter V'];

const BOOK_DEPTH = 16; // px — visible "thickness" of the book's 3D sides

type Flip = { dir: 'next' | 'prev'; target: number } | null;
type DragInfo = { dir: 'next' | 'prev'; target: number; startX: number; width: number; progress: number };

/* ── Main ────────────────────────────────────────────────── */
export default function CenteredBook() {
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState<Flip>(null);
  const [isDragging, setIsDragging] = useState(false);
  const total = 6;

  const bookRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<DragInfo | null>(null);

  /* leafRotate: 0 = leaf lying flat/visible, -180 = leaf fully turned away/hidden.
     Both drag and click-triggered flips drive this single value. */
  const leafRotate = useMotionValue(0);
  const bendOpacity = useTransform(leafRotate, [-180, -90, 0], [0.12, 0.85, 0.12]);
  const sweepX = useTransform(leafRotate, [-180, -90, 0], ['60%', '0%', '-60%']);

  const runFlip = useCallback((dir: 'next' | 'prev', target: number) => {
    if (flip || target < 0 || target >= total) return;
    const touchesCover = page === 0 || target === 0;
    setFlip({ dir, target });
    leafRotate.set(dir === 'next' ? 0 : -180);
    animate(leafRotate, dir === 'next' ? -180 : 0, {
      duration: touchesCover ? 1.5 : 1.1,
      ease: touchesCover ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1],
      onComplete: () => {
        setPage(target);
        setFlip(null);
      },
    });
  }, [flip, page, total, leafRotate]);

  const next = useCallback(() => runFlip('next', page + 1), [page, runFlip]);
  const prev = useCallback(() => runFlip('prev', page - 1), [page, runFlip]);

  const goTo = useCallback((t: number) => {
    if (flip || t === page || t < 0 || t >= total) return;
    if (Math.abs(t - page) === 1) { runFlip(t > page ? 'next' : 'prev', t); return; }
    setPage(t);
  }, [flip, page, total, runFlip]);

  const pages: React.ReactNode[] = [
    <CoverPage key="cover" onOpen={next} />,
    <AboutPage key="about" />,
    <SkillsPage key="skills" />,
    <ProjectsPage key="projects" />,
    <ExperiencePage key="experience" />,
    <ContactPage key="contact" />,
  ];

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [next, prev]);

  useEffect(() => {
    let sx = 0;
    const s = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const end = (e: TouchEvent) => { const d = sx - e.changedTouches[0].clientX; if (Math.abs(d) > 50) d > 0 ? next() : prev(); };
    window.addEventListener('touchstart', s);
    window.addEventListener('touchend', end);
    return () => { window.removeEventListener('touchstart', s); window.removeEventListener('touchend', end); };
  }, [next, prev]);

  /* Grab-and-drag flip — mouse only; touch keeps the swipe gesture above */
  const startDrag = useCallback((dir: 'next' | 'prev') => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || flip) return;
    const target = dir === 'next' ? page + 1 : page - 1;
    if (target < 0 || target >= total) return;
    const width = bookRef.current?.clientWidth ?? 560;
    dragInfo.current = { dir, target, startX: e.clientX, width, progress: 0 };
    leafRotate.set(dir === 'next' ? 0 : -180);
    setFlip({ dir, target });
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }, [flip, page, total, leafRotate]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) => {
      const info = dragInfo.current;
      if (!info) return;
      const dx = e.clientX - info.startX;
      const range = info.width * 0.7;
      const t = info.dir === 'next' ? clamp(-dx / range, 0, 1) : clamp(dx / range, 0, 1);
      info.progress = t;
      leafRotate.set(info.dir === 'next' ? -180 * t : -180 + 180 * t);
    };
    const onUp = () => {
      const info = dragInfo.current;
      dragInfo.current = null;
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      if (!info) return;
      const committed = info.progress > 0.35;
      const endAngle = info.dir === 'next' ? (committed ? -180 : 0) : (committed ? 0 : -180);
      animate(leafRotate, endAngle, {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => {
          if (committed) setPage(info.target);
          setFlip(null);
        },
      });
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [isDragging, leafRotate]);

  /* Subtle mouse-tilt parallax — makes the book feel handheld, and reveals its 3D sides */
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 120, damping: 18, mass: 0.4 });
  const tiltY = useSpring(rawTiltY, { stiffness: 120, damping: 18, mass: 0.4 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (reducedMotion.current || e.pointerType !== 'mouse') return;
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    rawTiltY.set(nx * 8);
    rawTiltX.set(-ny * 8);
  }, [rawTiltX, rawTiltY]);

  const handlePointerLeave = useCallback(() => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  }, [rawTiltX, rawTiltY]);

  const canTurnForward = !flip && page < total - 1;
  const canTurnBack = !flip && page > 0;

  return (
    <div
      className="w-full h-screen flex items-center justify-center overflow-hidden bg-[#241C17] relative"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* One quiet, static gradient — a dark surface with a single soft light source, nothing else */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 24% 16%, rgba(243,205,140,0.09), transparent 58%), ' +
            'radial-gradient(140% 110% at 18% 8%, #34281F 0%, #241C17 45%, #1A130E 100%)',
        }}
      />

      {/* Fine grain — keeps the dark field from reading as a flat digital fill */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette framing the whole scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(120% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.45) 100%)' }}
      />

      {/* Soft spotlight behind the book */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 46%, rgba(211,178,147,0.15), transparent 70%)' }}
      />

      {/* Ground contact shadow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[min(56vw,560px)] h-[min(88vh,760px)] translate-y-3"
          style={{ background: 'radial-gradient(ellipse 70% 35% at 50% 100%, rgba(0,0,0,0.5), transparent 70%)', filter: 'blur(20px)' }}
        />
      </div>

      {/* Reflection — a faint echo of the book fading into a dark glossy surface below it */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none" style={{ top: 'calc(50% + min(44vh,380px))' }}>
        <div
          className="w-[min(56vw,560px)]"
          style={{
            height: 90,
            background: 'linear-gradient(to bottom, rgba(52,40,31,0.4), rgba(52,40,31,0))',
            filter: 'blur(3px)',
          }}
        />
      </div>

      {/* A single quiet signature in the corner — the one typographic grace note */}
      <p
        className="absolute bottom-6 right-6 z-10 pointer-events-none font-mono text-[9px] tracking-[0.3em] uppercase hidden sm:block"
        style={{ color: 'rgba(201,164,104,0.32)' }}
      >
        Igiraneza Joseph
      </p>

      {/* Book — tilts gently toward the pointer for a handheld feel, revealing real 3D sides */}
      <motion.div
        ref={bookRef}
        className="relative z-20 w-[min(56vw,560px)] h-[min(88vh,760px)]"
        style={{
          perspective: '4400px',
          perspectiveOrigin: '50% 50%',
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Spine — left edge, true 3D depth panel */}
        <div
          className="absolute top-0 left-0 h-full pointer-events-none"
          style={{
            width: BOOK_DEPTH,
            transformOrigin: 'left center',
            transform: 'rotateY(90deg)',
            background: 'linear-gradient(90deg, #241811, #150E09)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.4)',
          }}
        />
        {/* Page stack — right edge, true 3D depth panel */}
        <div
          className="absolute top-0 right-0 h-full pointer-events-none"
          style={{
            width: BOOK_DEPTH,
            transformOrigin: 'right center',
            transform: 'rotateY(-90deg)',
            background: 'repeating-linear-gradient(to bottom, #F1E3CC 0px, #F1E3CC 2px, #D3B293 2px, #D3B293 3px)',
          }}
        />
        {/* Page stack — bottom edge, true 3D depth panel */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: BOOK_DEPTH,
            transformOrigin: 'center top',
            transform: 'rotateX(-90deg)',
            background: 'repeating-linear-gradient(to right, #F1E3CC 0px, #F1E3CC 2px, #D3B293 2px, #D3B293 3px)',
          }}
        />

        {/* Bookmark ribbon — slides to mark progress through the book */}
        <AnimatePresence>
          {page > 0 && (
            <motion.div
              key="ribbon"
              className="absolute -top-2 z-30 pointer-events-none"
              style={{ width: 14 }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 60, opacity: 1, left: `calc(${(page / (total - 1)) * 82 + 8}% - 7px)` }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ left: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }, default: { duration: 0.3 } }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(180deg,#9C3A3A,#6B1F1F)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Flip stage ──────────────────────────────────── */}
        {flip ? (
          <>
            {/* Static page underneath — what the moving leaf reveals or covers */}
            <div className="absolute inset-0 overflow-hidden rounded-sm">
              {flip.dir === 'next' ? pages[flip.target] : pages[page]}
            </div>

            {/* Moving leaf — the page actually being turned, hinged at the spine */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-sm"
              style={{
                rotateY: leafRotate,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                boxShadow: '0 10px 34px rgba(0,0,0,0.4)',
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
            >
              <div className="absolute inset-0">
                {flip.dir === 'next' ? pages[page] : pages[flip.target]}
              </div>

              {/* Shading that peaks mid-turn, simulating the paper bending rather than staying rigid */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: bendOpacity,
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.3) 100%)',
                }}
              />
              {/* Gloss sweep tracking the turn */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  x: sweepX,
                  opacity: bendOpacity,
                  background: 'linear-gradient(100deg, transparent 42%, rgba(255,255,255,0.14) 50%, transparent 58%)',
                }}
              />
            </motion.div>
          </>
        ) : (
          <div className="absolute inset-0 overflow-hidden rounded-sm">
            {pages[page]}
          </div>
        )}

        {/* Edge grab-zones — hover for a hand cursor, drag to turn like a real page */}
        {canTurnForward && (
          <div
            onPointerDown={startDrag('next')}
            className="absolute right-0 top-0 bottom-0 z-[25] cursor-grab"
            style={{ width: '14%' }}
            aria-hidden="true"
          />
        )}
        {canTurnBack && (
          <div
            onPointerDown={startDrag('prev')}
            className="absolute left-0 top-0 bottom-0 z-[25] cursor-grab"
            style={{ width: '14%' }}
            aria-hidden="true"
          />
        )}

        {/* Spine crease */}
        <div className="absolute top-0 bottom-0 left-1/2 w-3 -ml-1.5 bg-gradient-to-r from-transparent via-black/20 to-transparent z-20 pointer-events-none" />

        {/* Hardcover frame */}
        <div
          className="absolute -inset-[3px] rounded-sm pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 2px rgba(82,57,43,0.6), inset 0 0 0 4px rgba(211,178,147,0.2)' }}
        />

        {/* Corner-curl affordance — hints that the page can be turned */}
        {canTurnForward && page > 0 && (
          <button
            onClick={next}
            aria-label="Turn page"
            className="absolute right-0 bottom-0 z-30 w-11 h-11 group/corner"
          >
            <div
              className="absolute right-0 bottom-0 w-full h-full transition-transform duration-300 ease-out group-hover/corner:-translate-x-1 group-hover/corner:-translate-y-1"
              style={{
                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                background: 'linear-gradient(135deg, #F5E9CE 0%, #D9C3A3 55%, #AF8C5C 100%)',
                boxShadow: '-4px -4px 10px rgba(0,0,0,0.18)',
              }}
            />
          </button>
        )}
      </motion.div>

      {/* Nav arrows */}
      {canTurnBack && (
        <button onClick={prev} className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-40 w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#EFDFCA] border border-[#9C6D48]/30 flex items-center justify-center text-[#9C6D48] hover:text-[#52392B] hover:bg-white transition-all shadow-lg" aria-label="Previous">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>
      )}
      {canTurnForward && (
        <button onClick={next} className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-40 w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#EFDFCA] border border-[#9C6D48]/30 flex items-center justify-center text-[#9C6D48] hover:text-[#52392B] hover:bg-white transition-all shadow-lg" aria-label="Next">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>
      )}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => goTo(i)} title={chapterLabels[i]}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === page ? 'bg-[#EFDFCA] scale-125' : 'bg-[#EFDFCA]/25 hover:bg-[#EFDFCA]/50'}`}
            aria-label={chapterLabels[i]} />
        ))}
      </div>
    </div>
  );
}
