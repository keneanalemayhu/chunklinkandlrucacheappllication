// @/components/lru-cache/lru-system.ts

interface DoublyLinkedListNode<T> {
  key: string;
  value: T;
  prev: DoublyLinkedListNode<T> | null;
  next: DoublyLinkedListNode<T> | null;
}

export class LRUCache<T> {
  private capacity: number;
  private cache: Map<string, DoublyLinkedListNode<T>>;
  private head: DoublyLinkedListNode<T> | null;
  private tail: DoublyLinkedListNode<T> | null;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = null;
    this.tail = null;
  }

  private addNode(node: DoublyLinkedListNode<T>): void {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  private removeNode(node: DoublyLinkedListNode<T>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
  }

  private moveToHead(node: DoublyLinkedListNode<T>): void {
    this.removeNode(node);
    this.addNode(node);
  }

  private removeTail(): DoublyLinkedListNode<T> | null {
    if (!this.tail) return null;

    const tail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
    }

    return tail;
  }

  get(key: string): T | undefined {
    const node = this.cache.get(key);
    if (!node) return undefined;

    this.moveToHead(node);
    return node.value;
  }

  put(key: string, value: T): void {
    const existingNode = this.cache.get(key);

    if (existingNode) {
      existingNode.value = value;
      this.moveToHead(existingNode);
      return;
    }

    const newNode: DoublyLinkedListNode<T> = {
      key,
      value,
      prev: null,
      next: null,
    };

    this.cache.set(key, newNode);
    this.addNode(newNode);

    if (this.cache.size > this.capacity) {
      const tail = this.removeTail();
      if (tail) {
        this.cache.delete(tail.key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
    this.head = null;
    this.tail = null;
  }

  getSize(): number {
    return this.cache.size;
  }

  getCapacity(): number {
    return this.capacity;
  }

  getItems(): Array<{ key: string; value: T }> {
    const items: Array<{ key: string; value: T }> = [];
    let current = this.head;

    while (current) {
      items.push({
        key: current.key,
        value: current.value,
      });
      current = current.next;
    }

    return items;
  }
}
