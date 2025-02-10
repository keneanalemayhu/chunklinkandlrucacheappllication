// src/app/page.tsx
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">DSA Project Implementation</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/ChunkLink">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>ChunkLink System</CardTitle>
              <CardDescription>
                File storage and reconstruction system with chunk-based linked list implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-4">
                <li>Split files into chunks</li>
                <li>Linked list structure</li>
                <li>SHA-256 verification</li>
                <li>File reconstruction</li>
              </ul>
            </CardContent>
          </Card>
        </Link>

        <Link href="/LruCache">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>LRU Cache</CardTitle>
              <CardDescription>
                Least Recently Used Cache implementation with O(1) operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-4">
                <li>Constant time operations</li>
                <li>Automatic eviction</li>
                <li>Size management</li>
                <li>Usage tracking</li>
              </ul>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  )
}