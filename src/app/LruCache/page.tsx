// src/app/lru-cache/page.tsx
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CacheControls } from "@/components/LruCache/CacheControls";

export default function LRUCachePage() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">LRU Cache Implementation</h1>
        <p className="text-gray-600 mb-8">
          A Least Recently Used (LRU) cache implementation with O(1) time
          complexity for both get and put operations. The cache automatically
          removes the least recently used item when it reaches capacity.
        </p>

        <CacheControls />
      </div>
    </div>
  );
}
