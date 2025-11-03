"use client";

import { usePortfolioStore } from "@/store/usePortafolioStore";

export default function HeroForm() {
  const hero = usePortfolioStore((state) => state.hero);
  const setHero = usePortfolioStore((state) => state.setHero);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Hero Section</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={hero.name}
          onChange={(e) => setHero({ name: e.target.value })}
          className="border rounded-md px-3 py-2"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={hero.title}
          onChange={(e) => setHero({ title: e.target.value })}
          className="border rounded-md px-3 py-2"
          placeholder="Software Developer"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Tagline</label>
        <input
          type="text"
          value={hero.tagline}
          onChange={(e) => setHero({ tagline: e.target.value })}
          className="border rounded-md px-3 py-2"
          placeholder="Building cool things with code ✨"
        />
      </div>
    </div>
  );
}
