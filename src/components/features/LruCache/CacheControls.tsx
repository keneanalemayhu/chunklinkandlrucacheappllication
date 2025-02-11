// @/components/LruCache/CacheControls.tsx

"use client";

import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LRUCache } from "./LruSystem";
import { CacheVisualizer } from "./CacheVisualizer";
import { translations } from "@/translations";
import { useLanguage } from "@/components/context/LanguageContext";

export function CacheControls() {
  const { language } = useLanguage();
  const t = translations[language].lruCache;
  const [cache] = useState(() => new LRUCache<string>(5)); // Cache with capacity 5
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [items, setItems] = useState<Array<{ key: string; value: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const handlePut = () => {
    if (!key || !value) {
      setError("Both key and value are required");
      return;
    }

    try {
      cache.put(key, value);
      setItems(cache.getItems());
      setKey("");
      setValue("");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    }
  };

  const handleGet = () => {
    if (!searchKey) {
      setError("Search key is required");
      return;
    }

    const result = cache.get(searchKey);
    setSearchResult(result !== undefined ? result : null);
    setItems(cache.getItems());
    setError(null);
  };

  const handleClear = () => {
    cache.clear();
    setItems([]);
    setSearchResult(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Put Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.addItem}</h3>
            <div className="flex space-x-2">
              <Input
                placeholder={t.keyPlaceholder}
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <Input
                placeholder={t.valuePlaceholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button onClick={handlePut}>
                <Plus className="w-4 h-4 mr-2" />
                {t.add}
              </Button>
            </div>
          </div>

          {/* Get Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.searchItem}</h3>
            <div className="flex space-x-2">
              <Input
                placeholder={t.searchPlaceholder}
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <Button variant="outline" onClick={handleGet}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="destructive" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-2" />
            {t.clearCache}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {searchResult !== null && (
          <Alert className="mt-4">
            <AlertDescription>
              {searchResult
                ? `Found value: ${searchResult}`
                : "Key not found in cache"}
            </AlertDescription>
          </Alert>
        )}
      </Card>

      <CacheVisualizer items={items} capacity={cache.getCapacity()} />
    </div>
  );
}
