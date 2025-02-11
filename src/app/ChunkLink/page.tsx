// src/app/ChunkLink/page.tsx

"use client";

import { FileProcessor } from "@/components/features/ChunkLink/FileProcessor";
import { translations } from "@/translations";
import { useLanguage } from "@/components/context/LanguageContext";

export default function ChunkLinkPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="container mx-auto p-8 pt-20 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4">{t.chunkLinkSystem}</h1>
        <p className="text-muted-foreground mb-8">
          {t.chunkLink.uploadFile}
        </p>
        <FileProcessor />
      </div>
    </div>
  );
}
