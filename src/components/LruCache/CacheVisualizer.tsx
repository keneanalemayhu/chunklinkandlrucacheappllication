/* eslint-disable @typescript-eslint/no-explicit-any */
// @/components/lru-cache/cache-visualizer.tsx

import { Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CacheVisualizerProps {
  items: Array<{ key: string; value: any }>;
  capacity: number;
}

export function CacheVisualizer({ items, capacity }: CacheVisualizerProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Cache Status</h3>
        <Badge variant="secondary">
          {items.length}/{capacity} items
        </Badge>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.key}
            className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <Database className="w-5 h-5 text-blue-600 mr-3" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">{item.key}</span>
                <Badge variant="outline" className="ml-2">
                  {index === 0
                    ? "MRU"
                    : index === items.length - 1
                    ? "LRU"
                    : ""}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 mt-1 font-mono">
                {JSON.stringify(item.value)}
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">Cache is empty</div>
        )}
      </div>
    </Card>
  );
}
