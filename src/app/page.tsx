// @/app/page.tsx

"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { translations } from "@/translations";
import { useLanguage } from "@/components/context/LanguageContext";
import { FileText, Github } from "lucide-react";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="container mx-auto p-8 pt-16 flex flex-col justify-center min-h-screen font-mono">
      <div className="max-w-5xl mx-auto w-full space-y-12">
        <div>
          <h1 className="text-4xl font-bold mb-8">
            {t.root.dsaProjectImplementation}
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/ChunkLink" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{t.chunkLinkSystem}</CardTitle>
                  <CardDescription>{t.root.fileStorage}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc ml-4 space-y-2 text-sm text-muted-foreground">
                    <li>{t.root.SplitFiles}</li>
                    <li>{t.root.Linkedlist}</li>
                    <li>{t.root.SHA256Verification}</li>
                    <li>{t.root.FileReconstruction}</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
            <Link href="/LruCache" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{t.root.LRUCache}</CardTitle>
                  <CardDescription>
                    {t.root.lruCacheImplementation}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc ml-4 space-y-2 text-sm text-muted-foreground">
                    <li>{t.root.cto}</li>
                    <li>{t.root.automaticEviction}</li>
                    <li>{t.root.sizeManagement}</li>
                    <li>{t.root.usageTracking}</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div className="flex items-start gap-6 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-4">
            <a
              href="/files/DsaProjectDescription.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-6 h-6" />
              <span>{t.root.downloadProjectDescription}</span>
            </a>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              {t.root.teacher}
            </h2>
            <a
              href="https://github.com/keneanalemayhu/chunklinkandlrucacheappllication"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Github className="w-5 h-5" />
              <span>{t.root.github}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}