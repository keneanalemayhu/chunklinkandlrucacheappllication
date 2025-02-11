// @/components/ChunkLink/ChunkSystem.ts

export interface ChunkNode {
  id: string;
  data: Uint8Array;
  nextChecksum: string | null;
  nextNode: ChunkNode | null;
  size: number;
}

export class ChunkLink {
  private head: ChunkNode | null = null;
  private nodeCount: number = 0;
  onChunkCreated?: (progress: number) => void;

  constructor(private chunkSize: number = 1024 * 1024) {} // Default 1MB chunks

  private createNode(
    data: Uint8Array,
    nextChecksum: string | null = null
  ): ChunkNode {
    return {
      id: Math.random().toString(36).substring(2, 9),
      data,
      nextChecksum,
      nextNode: null,
      size: data.length,
    };
  }

  async calculateChecksum(data: Uint8Array): Promise<string> {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async createChunks(file: File): Promise<number> {
    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);
    const chunks: Uint8Array[] = [];

    // Calculate total chunks
    const totalChunks = Math.ceil(fileData.length / this.chunkSize);
    let processedChunks = 0;

    // Split file into chunks
    for (let offset = 0; offset < fileData.length; offset += this.chunkSize) {
      const chunk = fileData.slice(offset, offset + this.chunkSize);
      chunks.push(chunk);
    }

    // Create and link nodes
    for (let i = 0; i < chunks.length; i++) {
      const nextData = chunks[i + 1];
      const nextChecksum = nextData
        ? await this.calculateChecksum(nextData)
        : null;
      const node = this.createNode(chunks[i], nextChecksum);

      if (!this.head) {
        this.head = node;
      } else {
        let current = this.head;
        while (current.nextNode) {
          current = current.nextNode;
        }
        current.nextNode = node;
      }

      this.nodeCount++;
      processedChunks++;

      // Report progress
      this.onChunkCreated?.(Math.round((processedChunks / totalChunks) * 100));
    }

    return this.nodeCount;
  }

  async verifyChain(): Promise<Array<{ nodeId: string; error: string }>> {
    const issues: Array<{ nodeId: string; error: string }> = [];
    let current = this.head;

    while (current?.nextNode) {
      const calculatedChecksum = await this.calculateChecksum(
        current.nextNode.data
      );
      if (calculatedChecksum !== current.nextChecksum) {
        issues.push({
          nodeId: current.id,
          error: "Checksum mismatch detected",
        });
      }
      current = current.nextNode;
    }

    return issues;
  }

  async reconstructFile(): Promise<Blob> {
    const chunks: Uint8Array[] = [];
    let current = this.head;

    while (current) {
      chunks.push(current.data);
      current = current.nextNode;
    }

    return new Blob(chunks);
  }

  getNodeList(): Array<{ id: string; size: number; hasNext: boolean }> {
    const nodes: Array<{ id: string; size: number; hasNext: boolean }> = [];
    let current = this.head;

    while (current) {
      nodes.push({
        id: current.id,
        size: current.size,
        hasNext: !!current.nextNode,
      });
      current = current.nextNode;
    }

    return nodes;
  }
}
