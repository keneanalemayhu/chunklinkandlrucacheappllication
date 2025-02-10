// @/components/chunk-link/FileProcessor.tsx

"use client";

import { useCallback, useState } from "react";
import { Upload, AlertTriangle, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { ChunkLink } from "./ChunkSystem";
import { ChunkVisualizer } from "./ChunkVisualizer";

export function FileProcessor() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [nodes, setNodes] = useState<
    Array<{ id: string; size: number; hasNext: boolean }>
  >([]);
  const [chunkSystem, setChunkSystem] = useState<ChunkLink | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "none" | "verified" | "failed"
  >("none");

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setProcessing(true);
      setProgress(0);
      setError(null);

      try {
        const system = new ChunkLink(1024 * 100); // 100KB chunks
        await system.createChunks(file);
        setChunkSystem(system);
        setNodes(system.getNodeList());
        setProgress(100);
        setVerificationStatus("none");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to process file");
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  const verifyChain = useCallback(async () => {
    if (!chunkSystem) return;

    try {
      const issues = await chunkSystem.verifyChain();
      setVerificationStatus(issues.length === 0 ? "verified" : "failed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    }
  }, [chunkSystem]);

  const downloadReconstructed = useCallback(async () => {
    if (!chunkSystem) return;

    try {
      const blob = await chunkSystem.reconstructFile();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reconstructed-file";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    }
  }, [chunkSystem]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                       file:rounded-full file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {processing && (
              <Upload className="w-5 h-5 animate-spin text-blue-600" />
            )}
          </div>

          {progress > 0 && progress < 100 && (
            <Progress value={progress} className="w-full" />
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      {nodes.length > 0 && (
        <>
          <ChunkVisualizer nodes={nodes} />

          <div className="flex space-x-4">
            <Button
              onClick={verifyChain}
              className="flex items-center space-x-2"
              variant="outline"
            >
              <Check className="w-4 h-4" />
              <span>Verify Chain</span>
            </Button>

            <Button
              onClick={downloadReconstructed}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Reconstructed</span>
            </Button>
          </div>

          {verificationStatus !== "none" && (
            <Alert
              variant={
                verificationStatus === "verified" ? "default" : "destructive"
              }
            >
              {verificationStatus === "verified" ? (
                <Check className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertDescription>
                {verificationStatus === "verified"
                  ? "Chain verified successfully!"
                  : "Chain verification failed"}
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
