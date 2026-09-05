'use client';

/* ── Hand-drawn botanical SVG illustrations ─────────────── */

function TopLeftCorner() {
  return (
    <svg
      className="absolute top-0 left-0 w-[200px] h-[220px] pointer-events-none"
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main vine curling from corner */}
      <path
        d="M0 80 C20 75, 35 60, 50 45 C65 30, 75 18, 95 10 C110 4, 130 2, 150 5"
        stroke="#9C6D48"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Secondary vine */}
      <path
        d="M0 120 C15 115, 30 105, 40 90 C50 75, 55 60, 70 50 C85 40, 95 35, 110 30"
        stroke="#9C6D48"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Small branch */}
      <path
        d="M50 45 C55 35, 65 28, 78 25"
        stroke="#9C6D48"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Leaves */}
      <path
        d="M42 52 C38 44, 44 38, 50 42 C56 46, 48 54, 42 52Z"
        fill="#D3B293"
        opacity="0.5"
      />
      <path
        d="M70 30 C68 22, 76 18, 80 24 C84 30, 74 34, 70 30Z"
        fill="#D3B293"
        opacity="0.45"
      />
      <path
        d="M95 12 C92 5, 100 2, 104 8 C108 14, 98 16, 95 12Z"
        fill="#D3B293"
        opacity="0.4"
      />
      <path
        d="M110 28 C108 20, 116 18, 118 24 C120 30, 112 32, 110 28Z"
        fill="#D3B293"
        opacity="0.35"
      />
      <path
        d="M35 80 C30 72, 36 66, 42 72 C48 78, 38 84, 35 80Z"
        fill="#D3B293"
        opacity="0.4"
      />
      {/* Tiny flower buds */}
      <circle cx="150" cy="5" r="2.5" fill="#9C6D48" opacity="0.3" />
      <circle cx="148" cy="8" r="2" fill="#D3B293" opacity="0.35" />
      <circle cx="152" cy="9" r="1.8" fill="#D3B293" opacity="0.3" />
      {/* Small dot accents */}
      <circle cx="80" cy="20" r="1" fill="#9C6D48" opacity="0.25" />
      <circle cx="60" cy="40" r="0.8" fill="#9C6D48" opacity="0.2" />
    </svg>
  );
}

function TopRightCorner() {
  return (
    <svg
      className="absolute top-0 right-0 w-[200px] h-[220px] pointer-events-none"
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'scaleX(-1)' }}
    >
      {/* Mirror of top-left */}
      <path
        d="M0 80 C20 75, 35 60, 50 45 C65 30, 75 18, 95 10 C110 4, 130 2, 150 5"
        stroke="#9C6D48"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M0 120 C15 115, 30 105, 40 90 C50 75, 55 60, 70 50 C85 40, 95 35, 110 30"
        stroke="#9C6D48"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M50 45 C55 35, 65 28, 78 25"
        stroke="#9C6D48"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M42 52 C38 44, 44 38, 50 42 C56 46, 48 54, 42 52Z"
        fill="#D3B293"
        opacity="0.5"
      />
      <path
        d="M70 30 C68 22, 76 18, 80 24 C84 30, 74 34, 70 30Z"
        fill="#D3B293"
        opacity="0.45"
      />
      <path
        d="M95 12 C92 5, 100 2, 104 8 C108 14, 98 16, 95 12Z"
        fill="#D3B293"
        opacity="0.4"
      />
      <path
        d="M110 28 C108 20, 116 18, 118 24 C120 30, 112 32, 110 28Z"
        fill="#D3B293"
        opacity="0.35"
      />
      <path
        d="M35 80 C30 72, 36 66, 42 72 C48 78, 38 84, 35 80Z"
        fill="#D3B293"
        opacity="0.4"
      />
      <circle cx="150" cy="5" r="2.5" fill="#9C6D48" opacity="0.3" />
      <circle cx="148" cy="8" r="2" fill="#D3B293" opacity="0.35" />
      <circle cx="152" cy="9" r="1.8" fill="#D3B293" opacity="0.3" />
      <circle cx="80" cy="20" r="1" fill="#9C6D48" opacity="0.25" />
    </svg>
  );
}

function BottomLeftCorner() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-[180px] h-[200px] pointer-events-none"
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'scaleY(-1)' }}
    >
      <path
        d="M0 70 C15 65, 30 55, 45 42 C60 28, 72 18, 90 12 C105 7, 120 5, 140 8"
        stroke="#9C6D48"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M0 110 C12 105, 25 95, 35 82 C45 68, 50 55, 65 48"
        stroke="#9C6D48"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M38 48 C42 38, 52 32, 62 30"
        stroke="#9C6D48"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M40 46 C36 38, 42 32, 48 38 C54 44, 44 50, 40 46Z"
        fill="#D3B293"
        opacity="0.45"
      />
      <path
        d="M62 28 C60 20, 68 16, 72 22 C76 28, 66 32, 62 28Z"
        fill="#D3B293"
        opacity="0.4"
      />
      <path
        d="M90 14 C87 6, 95 3, 98 9 C101 15, 93 17, 90 14Z"
        fill="#D3B293"
        opacity="0.35"
      />
      <path
        d="M28 72 C24 64, 30 58, 36 64 C42 70, 32 76, 28 72Z"
        fill="#D3B293"
        opacity="0.35"
      />
      <circle cx="140" cy="8" r="2" fill="#9C6D48" opacity="0.25" />
      <circle cx="138" cy="11" r="1.5" fill="#D3B293" opacity="0.3" />
    </svg>
  );
}

function BottomRightCorner() {
  return (
    <svg
      className="absolute bottom-0 right-0 w-[180px] h-[200px] pointer-events-none"
      viewBox="0 0 180 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'scale(-1, -1)' }}
    >
      <path
        d="M0 70 C15 65, 30 55, 45 42 C60 28, 72 18, 90 12 C105 7, 120 5, 140 8"
        stroke="#9C6D48"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M0 110 C12 105, 25 95, 35 82 C45 68, 50 55, 65 48"
        stroke="#9C6D48"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M38 48 C42 38, 52 32, 62 30"
        stroke="#9C6D48"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M40 46 C36 38, 42 32, 48 38 C54 44, 44 50, 40 46Z"
        fill="#D3B293"
        opacity="0.45"
      />
      <path
        d="M62 28 C60 20, 68 16, 72 22 C76 28, 66 32, 62 28Z"
        fill="#D3B293"
        opacity="0.4"
      />
      <path
        d="M90 14 C87 6, 95 3, 98 9 C101 15, 93 17, 90 14Z"
        fill="#D3B293"
        opacity="0.35"
      />
      <path
        d="M28 72 C24 64, 30 58, 36 64 C42 70, 32 76, 28 72Z"
        fill="#D3B293"
        opacity="0.35"
      />
      <circle cx="140" cy="8" r="2" fill="#9C6D48" opacity="0.25" />
      <circle cx="138" cy="11" r="1.5" fill="#D3B293" opacity="0.3" />
    </svg>
  );
}

function SideVines() {
  return (
    <>
      {/* Left edge vine */}
      <svg
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[40px] h-[300px] pointer-events-none"
        viewBox="0 0 40 300"
        fill="none"
      >
        <path
          d="M10 30 C8 60, 15 80, 12 110 C9 140, 14 170, 10 200 C6 230, 12 260, 10 290"
          stroke="#9C6D48"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M12 80 C8 75, 10 68, 16 72 C22 76, 14 84, 12 80Z"
          fill="#D3B293"
          opacity="0.25"
        />
        <path
          d="M10 150 C6 145, 8 138, 14 142 C20 146, 12 154, 10 150Z"
          fill="#D3B293"
          opacity="0.2"
        />
        <path
          d="M12 220 C8 215, 10 208, 16 212 C22 216, 14 224, 12 220Z"
          fill="#D3B293"
          opacity="0.22"
        />
      </svg>

      {/* Right edge vine */}
      <svg
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[40px] h-[300px] pointer-events-none"
        viewBox="0 0 40 300"
        fill="none"
        style={{ transform: 'translateY(-50%) scaleX(-1)' }}
      >
        <path
          d="M10 30 C8 60, 15 80, 12 110 C9 140, 14 170, 10 200 C6 230, 12 260, 10 290"
          stroke="#9C6D48"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.3"
        />
        <path
          d="M12 80 C8 75, 10 68, 16 72 C22 76, 14 84, 12 80Z"
          fill="#D3B293"
          opacity="0.25"
        />
        <path
          d="M10 150 C6 145, 8 138, 14 142 C20 146, 12 154, 10 150Z"
          fill="#D3B293"
          opacity="0.2"
        />
        <path
          d="M12 220 C8 215, 10 208, 16 212 C22 216, 14 224, 12 220Z"
          fill="#D3B293"
          opacity="0.22"
        />
      </svg>
    </>
  );
}

/* ── Main component ─────────────────────────────────────── */

export default function BotanicalFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <TopLeftCorner />
      <TopRightCorner />
      <BottomLeftCorner />
      <BottomRightCorner />
      <SideVines />
    </div>
  );
}
