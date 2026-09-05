"use client";

import { TimeOfDayProvider } from "@/components/TimeOfDay";
import { SoundProvider } from "@/components/AmbientSound";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TimeOfDayProvider>
      <SoundProvider>
        {children}
      </SoundProvider>
    </TimeOfDayProvider>
  );
}
