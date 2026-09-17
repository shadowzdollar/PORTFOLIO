'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BotanicalFrame from '@/components/BotanicalFrame';
import DeskDecorations from '@/components/DeskDecorations';
import AnimatedName from '@/components/AnimatedName';
import dynamic from 'next/dynamic';
const DevScene3D = dynamic(() => import('@/components/DevScene3D'), { ssr: false });


/* ── Page content ────────────────────────────────────────── */

function CoverPage() {
  return (
    <div className="w-full h-full bg-[#EFDFCA]">
      <img
        src="/new_cover(2).png"
        alt="Igiraneza Joseph — Backend & AI/ML Engineer"
        className="w-full h-full object-cover"
      />
    </div>
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

/* ── Pages array ─────────────────────────────────────────── */
const pages: React.ReactNode[] = [
  <CoverPage key="cover" />,
  <AboutPage key="about" />,
  <SkillsPage key="skills" />,
  <ProjectsPage key="projects" />,
  <ExperiencePage key="experience" />,
  <ContactPage key="contact" />,
];

/* ── Main ────────────────────────────────────────────────── */
export default function CenteredBook() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const [busy, setBusy] = useState(false);
  const total = pages.length;

  const goTo = useCallback((t: number) => {
    if (busy || t === page || t < 0 || t >= total) return;
    setDir(t > page ? 'next' : 'prev');
    setBusy(true);
    setPage(t);
    setTimeout(() => setBusy(false), 800);
  }, [page, busy, total]);

  const next = useCallback(() => { if (page < total - 1) goTo(page + 1); }, [page, total, goTo]);
  const prev = useCallback(() => { if (page > 0) goTo(page - 1); }, [page, goTo]);

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

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden bg-[#AF9F90]">

      {/* Desk decorations around the book */}
      <DeskDecorations />

      {/* Botanical frame illustrations */}
      <BotanicalFrame />

      {/* 3D dev scene beside the book (right side) */}
      <DevScene3D />

      {/* Animated rotating name */}
      <AnimatedName />

      {/* Illustration beside the book (left side) */}
      <motion.div
        className="absolute left-[3%] top-[35%] -translate-y-1/2 z-10 pointer-events-none"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      >
        <img
          src="/illustration.png"
          alt="Developer illustration"
          className="w-[38vw] max-w-[440px] h-auto object-contain drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(82,57,43,0.2))' }}
        />
      </motion.div>

      {/* Book shadow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[min(58vw,560px)] h-[min(90vh,800px)] rounded-lg shadow-[0_25px_80px_-15px_rgba(0,0,0,0.25)]" />
      </div>

      {/* Book container */}
      <div className="relative z-20 w-[min(58vw,560px)] h-[min(90vh,800px)]"
        style={{ perspective: '3000px', perspectiveOrigin: '50% 50%' }}>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={{
              rotateY: dir === 'next' ? 60 : -60,
              translateZ: 0,
              opacity: 0.5,
            }}
            animate={{
              rotateY: 0,
              translateZ: 0,
              opacity: 1,
            }}
            exit={{
              rotateY: dir === 'next' ? -60 : 60,
              translateZ: 0,
              opacity: 0.5,
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-0 overflow-hidden rounded-lg"
            style={{
              transformOrigin: dir === 'next' ? 'left center' : 'right center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* The page content */}
            <div className="absolute inset-0 backface-hidden">
              {pages[page]}
            </div>

            {/* Page curl shadow on turning edge */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: dir === 'next' ? 0.15 : 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 25%)' }}
              animate={{ opacity: 0, background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, transparent 25%)' }}
              exit={{ opacity: dir === 'next' ? 0 : 0.15, background: dir === 'next' ? 'linear-gradient(to left, rgba(0,0,0,0.1) 0%, transparent 25%)' : 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 25%)' }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Center spine line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#D3B293]/30 via-[#9C6D48]/20 to-[#D3B293]/30 z-20 pointer-events-none" />
      </div>

      {/* Nav arrows */}
      {page > 0 && (
        <button onClick={prev} className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-40 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/60 border border-[#D3B293] flex items-center justify-center text-[#AF9F90] hover:text-[#52392B] hover:bg-white/80 transition-all shadow-sm backdrop-blur-sm" aria-label="Previous">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>
      )}
      {page < total - 1 && (
        <button onClick={next} className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-40 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/60 border border-[#D3B293] flex items-center justify-center text-[#AF9F90] hover:text-[#52392B] hover:bg-white/80 transition-all shadow-sm backdrop-blur-sm" aria-label="Next">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>
      )}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === page ? 'bg-[#52392B] scale-125' : 'bg-[#9C6D48]/30 hover:bg-[#9C6D48]/50'}`}
            aria-label={`Page ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
