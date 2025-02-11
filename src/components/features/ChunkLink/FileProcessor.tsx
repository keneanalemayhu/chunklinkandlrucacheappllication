/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from "react";
import { AlertTriangle, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { ChunkLink } from "./ChunkSystem";
import { ChunkVisualizer } from "./ChunkVisualizer";
import { FileUpload } from "@/components/ui/file-upload";
import { translations } from "@/translations";
import { useLanguage } from "@/components/context/LanguageContext";

export function FileProcessor() {
  const { language } = useLanguage();
  const t = translations[language].chunkLink;
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

  const handleFileUpload = useCallback(async (files: File[]) => {
    if (!files.length) return;
    const file = files[0];

    setProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const system = new ChunkLink(1024 * 100);
      system.onChunkCreated = (progress) => {
        setProgress(progress);
      };

      await system.createChunks(file);
      setChunkSystem(system);
      setNodes(system.getNodeList());
      setVerificationStatus("none");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.failedToProcessFile);
    } finally {
      setProcessing(false);
    }
  }, [t.failedToProcessFile]);

  const verifyChain = useCallback(async () => {
    if (!chunkSystem) return;

    try {
      const issues = await chunkSystem.verifyChain();
      setVerificationStatus(issues.length === 0 ? "verified" : "failed");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.verificationFailed);
    }
  }, [chunkSystem, t.verificationFailed]);

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
      setError(err instanceof Error ? err.message : t.downloadFailed);
    }
  }, [chunkSystem, t.downloadFailed]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <FileUpload onChange={handleFileUpload} />
        {progress > 0 && progress < 100 && (
          <Progress value={progress} className="w-full mt-4" />
        )}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
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
              <span>{t.verifyChain}</span>
            </Button>

            <Button
              onClick={downloadReconstructed}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{t.download}</span>
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
                  ? t.chainVerifiedSuccessfully!
                  : t.chainVerificationFailed}
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
