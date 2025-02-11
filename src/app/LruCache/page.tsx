// src/app/lru-cache/page.tsx

"use client";

import { CacheControls } from "@/components/features/LruCache/CacheControls";
import { translations } from "@/translations";
import { useLanguage } from "@/components/context/LanguageContext";

export default function LRUCachePage() {
  const { language } = useLanguage();
  const t = translations[language].lruCache;
  return (
    <div className="container mx-auto p-8 pt-20 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4">{t.LRUCacheImplementaion}</h1>
        <p className="text-muted-foreground mb-8">
          {t.lruCacheUsed}
        </p>
        <CacheControls />
      </div>
    </div>
  );
}
