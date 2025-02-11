/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/LruCache/CacheVisualizer.tsx

import { Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { translations } from "@/translations";
import { useLanguage } from "@/components/context/LanguageContext";

interface CacheVisualizerProps {
  items: Array<{ key: string; value: any }>;
  capacity: number;
}

export function CacheVisualizer({ items, capacity }: CacheVisualizerProps) {
  const { language } = useLanguage();
  const t = translations[language].lruCache;

  return (
    <Card className="p-6 dark:bg-black">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:bg-black">{t.cacheStatus}</h3>
        <Badge variant="secondary">
          {items.length}/{capacity} {t.items}
        </Badge>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.key}
            className="flex items-center p-3 bg-gray-50 dark:bg-black rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm dark:text-gray-100">
                  {item.key}
                </span>
                <Badge variant="outline" className="ml-2">
                  {index === 0
                    ? t.mru
                    : index === items.length - 1
                    ? t.lru
                    : ""}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-mono">
                {JSON.stringify(item.value)}
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t.cacheIsEmpty}
          </div>
        )}
      </div>
    </Card>
  );
}