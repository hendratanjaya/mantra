"use client";

import { SettingCard } from "./_components/setting-card";

export default function Page() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-2xl border bg-muted/50 overflow-y-auto custom-scrollbar">
      <SettingCard />
    </div>
  );
}
