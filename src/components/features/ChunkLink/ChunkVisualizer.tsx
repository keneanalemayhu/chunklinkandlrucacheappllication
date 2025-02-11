// @/components/chunk-link/chunk-visualizer.tsx

import { FileText, Link as LinkIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { translations } from "@/translations";
import { useLanguage } from "@/components/context/LanguageContext";

interface ChunkVisualizerProps {
  nodes: Array<{ id: string; size: number; hasNext: boolean }>;
}

export function ChunkVisualizer({ nodes }: ChunkVisualizerProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t.chunkStructure}</h3>
      <div className="flex flex-wrap gap-4 items-center">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex items-center">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex flex-col items-center">
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="text-xs mt-1 font-mono">
                {(node.size / 1024).toFixed(1)}KB
              </span>
              <span className="text-xs text-gray-500">Chunk {index + 1}</span>
            </div>
            {node.hasNext && (
              <LinkIcon className="w-6 h-6 mx-2 text-gray-400 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
