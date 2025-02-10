// src/app/chunk-link/page.tsx
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileProcessor } from "@/components/ChunkLink/FileProcessor";

export default function ChunkLinkPage() {
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
        <h1 className="text-3xl font-bold mb-4">ChunkLink System</h1>
        <p className="text-gray-600 mb-8">
          Upload a file to see it split into chunks and linked together using
          SHA-256 hashing. Each chunk is connected to the next one in a secure
          chain.
        </p>

        <FileProcessor />
      </div>
    </div>
  );
}
