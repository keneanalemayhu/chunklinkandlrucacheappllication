# Data Structures and Algorithms Implementation Project

This project implements two fundamental data structures: ChunkLink (a file storage system) and LRU Cache (Least Recently Used Cache). It's built using Next.js, TypeScript, and Tailwind CSS with a modern, interactive user interface.

## 🚀 Features

### ChunkLink System
- File splitting into manageable chunks
- SHA-256 hash-based chain verification
- Visual representation of file chunks
- Secure file reconstruction
- Real-time integrity verification
- Progress tracking for file operations

### LRU Cache Implementation
- O(1) time complexity for both get and put operations
- Automatic eviction of least recently used items
- Visual representation of cache state
- Real-time cache manipulation
- Capacity management

## 🛠️ Technologies Used

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📋 Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd chunklinkandlrucacheappllication
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Main landing page
│   ├── chunk-link/
│   │   └── page.tsx            # ChunkLink implementation page
│   └── lru-cache/
│       └── page.tsx            # LRU Cache implementation page
├── components/
│   ├── ui/                     # shadcn components
│   ├── chunk-link/
│   │   ├── ChunkVisualizer.tsx
│   │   ├── FileProcessor.tsx
│   │   └── ChunkSystem.ts
│   └── lru-cache/
│       ├── CacheVisualizer.tsx
│       ├── CacheControls.tsx
│       └── LruSystem.ts
└── lib/
    └── utils.ts
```

## 🔍 Implementation Details

### ChunkLink System
The ChunkLink system implements a secure file storage mechanism where:
- Files are split into fixed-size chunks (default 100KB)
- Each chunk is linked to the next using SHA-256 hashing
- Chain integrity can be verified at any time
- Files can be reconstructed from chunks
- Visual feedback shows the chunk structure

### LRU Cache
The LRU Cache implementation features:
- Fixed capacity management
- O(1) time complexity operations
- Doubly linked list + hash map data structure
- Automatic eviction of least recently used items
- Visual representation of cache state

## 🎯 Usage Examples

### ChunkLink System
1. Upload a file using the file input
2. Watch as the file is split into chunks
3. Verify chain integrity using the "Verify Chain" button
4. Download the reconstructed file

### LRU Cache
1. Add items using key-value pairs
2. Search for items by key
3. Watch as items are automatically evicted when capacity is reached
4. Clear the cache or remove individual items

## 🧪 Testing
To verify the implementations:

### ChunkLink
- Upload large files to test chunking
- Try modifying chunks to test integrity verification
- Verify reconstructed files match originals

### LRU Cache
- Add more items than capacity allows
- Verify least recently used items are evicted
- Test get/put operations for O(1) performance

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Assignment Details

This project was completed as part of a Data Structures and Algorithms course assignment. The implementation demonstrates:
- Practical application of data structures
- Understanding of algorithmic complexity
- Code organization and documentation
- User interface design
- Error handling and validation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.