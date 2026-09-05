'use client';

import { motion } from 'framer-motion';

export default function AnimatedName() {
  const name = 'IGIRANEZA JOSEPH';
  const repeat = '✦ BACKEND & AI/ML ENGINEER ✦ KIGALI, RWANDA ✦ ';
  const fullText = name + ' · ' + repeat + name + ' · ' + repeat;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
      {/* Outer ring — slow clockwise */}
      <motion.div
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="700" height="700" viewBox="0 0 700 700" className="opacity-20">
          <defs>
            <path
              id="outerCircle"
              d="M 350,350 m -330,0 a 330,330 0 1,1 660,0 a 330,330 0 1,1 -660,0"
              fill="none"
            />
          </defs>
          <text
            className="fill-[#52392B]"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', letterSpacing: '6px', fontWeight: 600 }}
          >
            <textPath href="#outerCircle" startOffset="0%">
              {fullText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Inner ring — slow counter-clockwise */}
      <motion.div
        className="absolute"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="620" height="620" viewBox="0 0 620 620" className="opacity-15">
          <defs>
            <path
              id="innerCircle"
              d="M 310,310 m -290,0 a 290,290 0 1,1 580,0 a 290,290 0 1,1 -580,0"
              fill="none"
            />
          </defs>
          <text
            className="fill-[#9C6D48]"
            style={{ fontFamily: 'Caveat, cursive', fontSize: '13px', letterSpacing: '4px' }}
          >
            <textPath href="#innerCircle" startOffset="0%">
              {fullText}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center badge — slow pulse */}
      <motion.div
        className="absolute flex items-center justify-center"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-28 h-28 rounded-full border-2 border-[#9C6D48]/30 flex items-center justify-center bg-[#EFDFCA]/40 backdrop-blur-sm">
          <div className="w-20 h-20 rounded-full border border-[#D3B293]/40 flex items-center justify-center">
            <span className="font-serif text-[10px] font-bold text-[#52392B] tracking-[0.2em] text-center leading-tight">
              I.J<br />
              <span className="text-[8px] font-normal text-[#9C6D48] tracking-[0.15em]">EST. 2016</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
