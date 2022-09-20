# Binary Heaps
## About
This repo is for studying binary heaps.

## Heaps
The `MaxHeap` and `MinHeap` classes implement a basic heap data structure. They use a `one-based indexed array` as a data container.

### Constructor
A constructor requires the maximum number of elements in a heap.

### Properties
- `size` - current size of a heap.
- `maxSize` - maximum size of a heap.

### Methods
- `push(num: number)` - Add a number to the heap. Returns `true` if the heap size is not exceeded, or `false` otherwise.
- `pop(): number | undefined` - Removes the min(max)-heap element and returns it. If the heap is empty returns `undefined` and the heap is not modified.
- `peek(): number | undefined` - Returns the top min(max)-heap number or `undefined` if the heap is empty. The heap is not modified.

### Utility methods (private)
- `#heapifyUp(idx: number)` (iterative) - Traverse up the heap to find a suitable place for the number at index `idx`. The method is implemented in the `push()` method.
- `#heapifyDown(idx: number)` (iterative) - Traverse down the heap to find a suitable place for the number at index `idx`. The method is implemented in the `pop()` method.

### Time complexity
_n_ - the number of nodes in a heap (_the size of a heap_).
- `peek()` - O(1)
- `push()` - O(log _n_)
- `pop()` - O(log _n_)