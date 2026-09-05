'use client';

import CenteredBook from '@/components/CenteredBook';
import MagnifyingGlassCursor from '@/components/MagnifyingGlassCursor';

export default function Home() {
  return (
    <main className="min-h-screen">
      <MagnifyingGlassCursor />
      <CenteredBook />
    </main>
  );
}
