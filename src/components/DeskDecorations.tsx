'use client';

/* ── Scattered desk objects SURROUNDING the book ────────── */
/* Book occupies ~58vw × 90vh centered. Decorations sit in   */
/* the margins: left/right sides, top edge, bottom edge.     */

function CoffeeCup() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: '5%', right: '2%' }}
      width="80" height="90" viewBox="0 0 90 100" fill="none"
    >
      <ellipse cx="40" cy="88" rx="38" ry="8" fill="#D3B293" opacity="0.5" />
      <ellipse cx="40" cy="86" rx="34" ry="6" fill="#EBD2B3" opacity="0.6" />
      <path d="M18 45 C18 45 15 82 22 84 C29 86 51 86 58 84 C65 82 62 45 62 45Z" fill="#EBD2B3" opacity="0.7" />
      <path d="M18 45 C18 45 15 82 22 84 C29 86 51 86 58 84 C65 82 62 45 62 45Z" stroke="#9C6D48" strokeWidth="1" opacity="0.5" fill="none" />
      <ellipse cx="40" cy="45" rx="22" ry="5" fill="#EBD2B3" opacity="0.8" />
      <ellipse cx="40" cy="45" rx="22" ry="5" stroke="#9C6D48" strokeWidth="1" opacity="0.4" fill="none" />
      <path d="M62 52 C72 52 76 62 72 70 C68 78 62 74 62 70" stroke="#9C6D48" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" fill="none" />
      <ellipse cx="40" cy="48" rx="18" ry="3.5" fill="#9C6D48" opacity="0.35" />
      <path d="M32 38 C32 32 36 30 34 24" stroke="#9C6D48" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" fill="none" />
      <path d="M40 36 C40 30 44 28 42 22" stroke="#9C6D48" strokeWidth="0.8" strokeLinecap="round" opacity="0.18" fill="none" />
      <path d="M48 38 C48 32 52 30 50 24" stroke="#9C6D48" strokeWidth="0.8" strokeLinecap="round" opacity="0.15" fill="none" />
    </svg>
  );
}

function Compass() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: '8%', left: '1%' }}
      width="65" height="65" viewBox="0 0 70 70" fill="none"
    >
      <circle cx="35" cy="35" r="30" fill="#EBD2B3" opacity="0.25" />
      <circle cx="35" cy="35" r="30" stroke="#9C6D48" strokeWidth="1.2" opacity="0.4" fill="none" />
      <circle cx="35" cy="35" r="27" stroke="#D3B293" strokeWidth="0.5" opacity="0.25" fill="none" />
      <text x="35" y="14" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#9C6D48" opacity="0.4">N</text>
      <text x="35" y="62" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#9C6D48" opacity="0.3">S</text>
      <text x="10" y="38" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#9C6D48" opacity="0.3">W</text>
      <text x="60" y="38" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#9C6D48" opacity="0.3">E</text>
      <path d="M35 35 L33 18 L35 12 L37 18Z" fill="#9C6D48" opacity="0.4" />
      <path d="M35 35 L33 52 L35 58 L37 52Z" fill="#D3B293" opacity="0.3" />
      <circle cx="35" cy="35" r="3" fill="#52392B" opacity="0.3" />
      <circle cx="35" cy="35" r="1.5" fill="#D3B293" opacity="0.4" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 35 + 27 * Math.sin(rad);
        const y1 = 35 - 27 * Math.cos(rad);
        const x2 = 35 + 30 * Math.sin(rad);
        const y2 = 35 - 30 * Math.cos(rad);
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9C6D48" strokeWidth="0.5" opacity="0.25" />;
      })}
    </svg>
  );
}

function Candle() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: '30%', left: '1%' }}
      width="40" height="80" viewBox="0 0 45 90" fill="none"
    >
      <ellipse cx="22" cy="85" rx="18" ry="4" fill="#D3B293" opacity="0.4" />
      <rect x="10" y="78" width="24" height="7" rx="2" fill="#9C6D48" opacity="0.4" />
      <rect x="18" y="68" width="8" height="10" rx="1" fill="#9C6D48" opacity="0.35" />
      <ellipse cx="22" cy="68" rx="10" ry="3" fill="#D3B293" opacity="0.35" />
      <rect x="15" y="25" width="14" height="43" rx="3" fill="#EBD2B3" opacity="0.5" />
      <rect x="15" y="25" width="14" height="43" rx="3" stroke="#D3B293" strokeWidth="0.6" opacity="0.3" fill="none" />
      <path d="M15 40 C13 42 12 46 14 48 C16 46 15 42 15 40Z" fill="#EBD2B3" opacity="0.35" />
      <line x1="22" y1="25" x2="22" y2="18" stroke="#52392B" strokeWidth="0.8" opacity="0.4" />
      <path d="M22 18 C19 12 18 6 22 2 C26 6 25 12 22 18Z" fill="#9C6D48" opacity="0.3" />
      <path d="M22 16 C20.5 12 20 8 22 5 C24 8 23.5 12 22 16Z" fill="#D3B293" opacity="0.25" />
      <circle cx="22" cy="10" r="8" fill="#D3B293" opacity="0.08" />
    </svg>
  );
}

function StickyNote() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: '18%', left: '0.5%', transform: 'rotate(-8deg)' }}
      width="70" height="70" viewBox="0 0 80 80" fill="none"
    >
      <path d="M10 5 L65 5 L75 15 L75 75 L10 75Z" fill="#EBD2B3" opacity="0.4" />
      <path d="M10 5 L65 5 L75 15 L75 75 L10 75Z" stroke="#D3B293" strokeWidth="0.8" opacity="0.35" fill="none" />
      <path d="M65 5 L65 15 L75 15Z" fill="#D3B293" opacity="0.3" />
      <line x1="18" y1="22" x2="55" y2="22" stroke="#9C6D48" strokeWidth="0.5" opacity="0.2" />
      <line x1="18" y1="30" x2="50" y2="30" stroke="#9C6D48" strokeWidth="0.5" opacity="0.2" />
      <line x1="18" y1="38" x2="58" y2="38" stroke="#9C6D48" strokeWidth="0.5" opacity="0.2" />
      <line x1="18" y1="46" x2="45" y2="46" stroke="#9C6D48" strokeWidth="0.5" opacity="0.2" />
      <line x1="18" y1="54" x2="52" y2="54" stroke="#9C6D48" strokeWidth="0.5" opacity="0.2" />
      <rect x="28" y="0" width="20" height="8" rx="1" fill="#D3B293" opacity="0.25" transform="rotate(3 38 4)" />
    </svg>
  );
}

function MagnifyingGlass() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: '60%', left: '0.5%', transform: 'rotate(15deg)' }}
      width="65" height="80" viewBox="0 0 80 100" fill="none"
    >
      <circle cx="35" cy="35" r="25" fill="#EBD2B3" opacity="0.25" />
      <circle cx="35" cy="35" r="25" stroke="#9C6D48" strokeWidth="1.5" opacity="0.4" fill="none" />
      <path d="M22 22 C28 18 36 16 40 20" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.2" fill="none" />
      <path d="M53 53 L72 80" stroke="#9C6D48" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
      <path d="M53 53 L72 80" stroke="#D3B293" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <line x1="58" y1="59" x2="61" y2="63" stroke="#52392B" strokeWidth="0.5" opacity="0.2" />
      <line x1="62" y1="65" x2="65" y2="69" stroke="#52392B" strokeWidth="0.5" opacity="0.2" />
      <line x1="66" y1="71" x2="69" y2="75" stroke="#52392B" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function PaperClip() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ bottom: '5%', left: '3%', transform: 'rotate(25deg)' }}
      width="25" height="50" viewBox="0 0 30 60" fill="none"
    >
      <path
        d="M8 5 C4 5 2 8 2 12 L2 45 C2 52 8 56 15 56 C22 56 28 52 28 45 L28 20 C28 14 24 10 18 10 L12 10 C9 10 7 12 7 15 L7 42"
        stroke="#9C6D48"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
        fill="none"
      />
    </svg>
  );
}

function InkBottle() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ bottom: '10%', left: '12%', transform: 'rotate(-8deg)' }}
      width="35" height="48" viewBox="0 0 40 55" fill="none"
    >
      <path d="M8 22 C6 22 4 28 4 35 C4 45 10 50 20 50 C30 50 36 45 36 35 C36 28 34 22 32 22Z" fill="#52392B" opacity="0.3" />
      <path d="M8 22 C6 22 4 28 4 35 C4 45 10 50 20 50 C30 50 36 45 36 35 C36 28 34 22 32 22Z" stroke="#52392B" strokeWidth="0.8" opacity="0.25" fill="none" />
      <path d="M14 22 L14 12 C14 10 26 10 26 12 L26 22" fill="#52322B" opacity="0.25" />
      <path d="M14 22 L14 12 C14 10 26 10 26 12 L26 22" stroke="#52392B" strokeWidth="0.6" opacity="0.2" fill="none" />
      <rect x="12" y="6" width="16" height="6" rx="2" fill="#9C6D48" opacity="0.4" />
      <path d="M6 32 C12 30 28 30 34 32 L36 35 C36 45 30 50 20 50 C10 50 4 45 4 35Z" fill="#52392B" opacity="0.15" />
      <rect x="12" y="30" width="16" height="10" rx="1" fill="#EBD2B3" opacity="0.2" />
      <text x="20" y="37" textAnchor="middle" fontFamily="serif" fontSize="5" fill="#9C6D48" opacity="0.25">INK</text>
    </svg>
  );
}

function WaxSeal() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ bottom: '2%', left: '22%' }}
      width="45" height="45" viewBox="0 0 55 55" fill="none"
    >
      <circle cx="27.5" cy="27.5" r="24" fill="#9C6D48" opacity="0.35" />
      <circle cx="27.5" cy="27.5" r="24" stroke="#52392B" strokeWidth="0.8" opacity="0.25" fill="none" />
      <path d="M27.5 3.5 C32 4 38 6 42 10 C46 14 50 20 50 27.5 C50 32 48 37 45 41 C42 45 36 49 27.5 50 C20 50 14 46 10 42 C6 38 4 32 4 27.5 C4 20 8 14 12 10 C16 6 22 4 27.5 3.5Z"
        fill="#9C6D48" opacity="0.2" />
      <circle cx="27.5" cy="27.5" r="16" fill="#52392B" opacity="0.2" />
      <circle cx="27.5" cy="27.5" r="16" stroke="#EBD2B3" strokeWidth="0.8" opacity="0.3" fill="none" />
      <text x="27.5" y="32" textAnchor="middle" fontFamily="serif" fontSize="16" fontWeight="bold" fill="#EBD2B3" opacity="0.4">J</text>
    </svg>
  );
}

function PenQuill() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ bottom: '15%', left: '0.5%', transform: 'rotate(-35deg)' }}
      width="100" height="35" viewBox="0 0 120 40" fill="none"
    >
      <path d="M5 20 L90 18 L115 20 L90 22 Z" fill="#D3B293" opacity="0.5" />
      <path d="M5 20 L90 18 L115 20 L90 22 Z" stroke="#9C6D48" strokeWidth="0.8" opacity="0.4" fill="none" />
      <path d="M90 18 L118 20 L90 22Z" fill="#9C6D48" opacity="0.5" />
      <path d="M118 20 L115 16" stroke="#9C6D48" strokeWidth="0.5" opacity="0.4" />
      <line x1="25" y1="18.5" x2="25" y2="21.5" stroke="#9C6D48" strokeWidth="0.5" opacity="0.3" />
      <line x1="30" y1="18.5" x2="30" y2="21.5" stroke="#9C6D48" strokeWidth="0.5" opacity="0.3" />
      <line x1="35" y1="18.5" x2="35" y2="21.5" stroke="#9C6D48" strokeWidth="0.5" opacity="0.3" />
      <path d="M5 20 C0 14 2 10 8 12" stroke="#9C6D48" strokeWidth="0.6" opacity="0.3" fill="none" />
      <path d="M5 20 C0 26 2 30 8 28" stroke="#9C6D48" strokeWidth="0.6" opacity="0.3" fill="none" />
      <circle cx="116" cy="21" r="1.5" fill="#52392B" opacity="0.4" />
    </svg>
  );
}

function SmallPlant() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ bottom: '5%', right: '2%' }}
      width="60" height="78" viewBox="0 0 70 90" fill="none"
    >
      <path d="M20 55 L18 82 C18 85 52 85 52 82 L50 55Z" fill="#9C6D48" opacity="0.45" />
      <path d="M20 55 L18 82 C18 85 52 85 52 82 L50 55Z" stroke="#52392B" strokeWidth="0.8" opacity="0.3" fill="none" />
      <rect x="16" y="52" width="38" height="5" rx="2" fill="#9C6D48" opacity="0.5" />
      <ellipse cx="35" cy="54" rx="17" ry="3" fill="#52392B" opacity="0.3" />
      <path d="M35 52 C35 40 30 30 25 20" stroke="#9C6D48" strokeWidth="1" strokeLinecap="round" opacity="0.4" fill="none" />
      <path d="M35 52 C35 38 40 28 45 18" stroke="#9C6D48" strokeWidth="1" strokeLinecap="round" opacity="0.4" fill="none" />
      <path d="M35 52 C33 42 28 35 22 32" stroke="#9C6D48" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" fill="none" />
      <path d="M25 20 C20 14 18 10 22 8 C26 6 28 12 25 20Z" fill="#D3B293" opacity="0.45" />
      <path d="M45 18 C50 12 52 8 48 6 C44 4 42 10 45 18Z" fill="#D3B293" opacity="0.4" />
      <path d="M22 32 C16 28 14 24 18 22 C22 20 24 26 22 32Z" fill="#D3B293" opacity="0.35" />
      <path d="M28 36 C24 30 26 26 30 24 C34 22 32 30 28 36Z" fill="#D3B293" opacity="0.3" />
      <path d="M42 24 C46 18 48 14 44 12 C40 10 38 18 42 24Z" fill="#D3B293" opacity="0.35" />
    </svg>
  );
}

function ReadingGlasses() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: '12%', right: '1.5%', transform: 'rotate(-5deg)' }}
      width="75" height="38" viewBox="0 0 90 45" fill="none"
    >
      <circle cx="25" cy="22" r="14" fill="#EBD2B3" opacity="0.2" />
      <circle cx="25" cy="22" r="14" stroke="#9C6D48" strokeWidth="1.2" opacity="0.4" fill="none" />
      <circle cx="62" cy="22" r="14" fill="#EBD2B3" opacity="0.2" />
      <circle cx="62" cy="22" r="14" stroke="#9C6D48" strokeWidth="1.2" opacity="0.4" fill="none" />
      <path d="M39 20 C42 16 48 16 51 20" stroke="#9C6D48" strokeWidth="1" opacity="0.35" fill="none" />
      <path d="M11 22 C5 22 2 20 0 18" stroke="#9C6D48" strokeWidth="1" strokeLinecap="round" opacity="0.3" fill="none" />
      <path d="M76 22 C82 22 86 20 90 18" stroke="#9C6D48" strokeWidth="1" strokeLinecap="round" opacity="0.3" fill="none" />
      <path d="M18 16 C20 14 24 13 26 15" stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.15" fill="none" />
      <path d="M55 16 C57 14 61 13 63 15" stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.15" fill="none" />
    </svg>
  );
}

function Envelope() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ bottom: '8%', right: '1.5%', transform: 'rotate(5deg)' }}
      width="80" height="58" viewBox="0 0 90 65" fill="none"
    >
      <rect x="2" y="10" width="86" height="50" rx="2" fill="#EBD2B3" opacity="0.4" />
      <rect x="2" y="10" width="86" height="50" rx="2" stroke="#D3B293" strokeWidth="0.8" opacity="0.35" fill="none" />
      <path d="M2 10 L45 38 L88 10" stroke="#9C6D48" strokeWidth="0.8" opacity="0.3" fill="none" />
      <path d="M2 60 L35 38" stroke="#D3B293" strokeWidth="0.5" opacity="0.2" fill="none" />
      <path d="M88 60 L55 38" stroke="#D3B293" strokeWidth="0.5" opacity="0.2" fill="none" />
      <circle cx="45" cy="28" r="6" fill="#9C6D48" opacity="0.25" />
      <circle cx="45" cy="28" r="6" stroke="#52392B" strokeWidth="0.5" opacity="0.2" fill="none" />
    </svg>
  );
}

function OldCoin() {
  return (
    <svg
      className="absolute pointer-events-none"
      style={{ top: '5%', right: '16%' }}
      width="30" height="30" viewBox="0 0 35 35" fill="none"
    >
      <circle cx="17.5" cy="17.5" r="15" fill="#D3B293" opacity="0.3" />
      <circle cx="17.5" cy="17.5" r="15" stroke="#9C6D48" strokeWidth="1" opacity="0.35" fill="none" />
      <circle cx="17.5" cy="17.5" r="11" stroke="#9C6D48" strokeWidth="0.5" opacity="0.2" fill="none" />
      <text x="17.5" y="20" textAnchor="middle" fontFamily="serif" fontSize="8" fontWeight="bold" fill="#52392B" opacity="0.25">₹</text>
    </svg>
  );
}

/* ── Main component ─────────────────────────────────────── */

export default function DeskDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* LEFT side — top to bottom */}
      <Compass />
      <StickyNote />
      <Candle />
      <MagnifyingGlass />
      <PenQuill />
      <PaperClip />

      {/* RIGHT side — top to bottom */}
      <CoffeeCup />
      <OldCoin />
      <ReadingGlasses />
      <SmallPlant />
      <Envelope />

      {/* BOTTOM edge */}
      <InkBottle />
      <WaxSeal />
    </div>
  );
}
