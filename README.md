# Binary Heaps

This repo is for studying binary heaps.

## Content

- [Info](#info)
  - [Heap (wiki)](#heap-wiki)
  - [Priority Queue (wiki)](#priority-queue-wiki)
  - [Time complexity](#time-complexity)
- [Heaps](#heaps)
  - [Constructor](#constructor)
  - [Properties](#properties)
  - [Methods](#methods)
  - [Examples](#examples)
- [Priority Queue](#priority-queue-pq)
  - [Constructor](#constructor-1)
  - [Properties](#properties-1)
  - [Methods](#methods-1)
  - [Examples](#examples-1)
- [Common](#common)
  - [Utility methods](#utility-methods-private)

## Info

### Heap (wiki)

A `heap` is a specialized tree-based data structure which is essentially an almost complete tree that satisfies the heap property: in a `max-heap`, for any given node _C_, if _P_ is a parent node of _C_, then the key (the value) of _P_ is greater than or equal to the key of _C_. In a `min-heap`, the key of _P_ is less than or equal to the key of _C_.

### Priority Queue (wiki)

A `priority queue` is an abstract data-type similar to a regular `queue` or `stack` data structure in which each element additionally has a `priority` associated with it. In a priority queue, an element with high priority is served before an element with low priority.

### Time complexity

_n_ - the number of nodes in a heap (_the size of a heap or a priority queue_).

- `peek()` - O(1)
- `push()` - O(log _n_)
- `pop()` - O(log _n_)

## Heaps

The `MaxHeap` and `MinHeap` classes implement a basic heap data structure. They use a `one-based indexed array` as a data container. Both heap types can contain `numbers` only.

### Constructor

A constructor requires the maximum number of elements in a heap.

```js
const minHeap = new MinHeap(10); // contains a maximum of 10 numbers in the heap
```

### Properties

- `size` - current size of a heap.
- `maxSize` - maximum size of a heap.

### Methods

- `push(num: number)` - Add a number to the heap. Returns `true` if the heap size is not exceeded, or `false` otherwise.
- `pop(): number | undefined` - Removes the min(max)-heap element and returns it. If the heap is empty returns `undefined` and the heap is not modified.
- `peek(): number | undefined` - Returns the top min(max)-heap number or `undefined` if the heap is empty. The heap is not modified.

### Examples

<details>
<summary>MaxHeap</summary>

```js
const maxHeap = new MaxHeap(10);
maxHeap.push(5); // expected output: true
maxHeap.push(15); // expected output: true
maxHeap.push(7); // expected output: true
maxHeap.peek(); // expected output: 15
maxHeap.pop(); // expected output: 15
maxHeap.pop(); // expected output: 7
maxHeap.pop(); // expected output: 5
maxHeap.peek(); // expected output: undefined
```

</details>

<details>
<summary>MinHeap</summary>

```js
const minHeap = new MinHeap(3);
minHeap.push(5); // expected output: true
minHeap.push(8); // expected output: true
minHeap.push(4); // expected output: true
minHeap.push(1); // expected output: false
minHeap.peek(); // expected output: 4
minHeap.pop(); // expected output: 4
minHeap.pop(); // expected output: 5
minHeap.pop(); // expected output: 8
minHeap.pop(); // expected output: undefined
```

</details>

## Priority Queue (PQ)

The `PriorityQueue` class implements the same binary heap structure as `MinHeap` and `MaxHeap`, the difference is that `PQ` elements are prioritized according a compare function and the elements can be anything that can be compared in terms of priority.

### Constructor

A constructor takes one argument `compareFn` - a function used to determine the order (priority) of the nodes in a heap. Function is expected to return a `boolean` value.

```js
const compareFn = (childNode, parentNode) => boolean;
```

When `true` is returned, it means that `childNode` has a higher priority than `parentNode`.

If omitted, the nodes prioritized according the function (`min-heap`):

```js
const compareFn = (childNode, parentNode) => {
  return newNode < parentNode;
};
```

### Properties

- `size` - current size of a `PQ`.

### Methods

- `push(node: any): number` - Add a node to the `PQ`. Returns current size of the `PQ`.
- `pop(): any | undefined` - Removes the top `PQ` node and returns it. If the `PQ` is empty returns `undefined` and the `PQ` is not modified.
- `peek(): number | undefined` - Returns the top node or `undefined` if the `PQ` is empty. The `PQ` is not modified.

### Examples

<details>
<summary>PriorityQueue as a MinHeap</summary>

```js
// When compareFn argument is omitted the PQ behaves like a MinHeap.
const minHeap = new PriorityQueue();

minHeap.push(5); // expected output: 1
minHeap.push(15); // expected output: 2
minHeap.push(10); // expected output: 3
minHeap.peek(); // expected output: 5
minHeap.pop(); // expected output: 5
minHeap.pop(); // expected output: 10
minHeap.pop(); // expected output: 15
minHeap.peep(); // expected output: undefined
```

</details>

<details>
<summary>PriorityQueue with arrays as nodes</summary>

```js
// The nodes of the PQ are arrays of length 2 - node: [number, number].
// Let's prioritize the nodes according the second element in the node.
// The node with the smallest second element will be at the top of the PQ.
const compareFn = (childNode, parentNode) => {
  return childNode[1] < parentNode[1];
};

const pq = new PriorityQueue(compareFn);

pq.push([1, 4]); // expected output: 1
pq.push([1, 2]); // expected output: 2
pq.push([3, 1]); // expected output: 3
pq.push([2, 1]); // expected output: 4
pq.peek(); // expected output: [3, 1]
pq.pop(); // expected output: [3, 1]
pq.pop(); // expected output: [2, 1]
pq.pop(); // expected output: [1, 2]
pq.pop(); // expected output: [1, 4]
```

In this example, when two nodes have the same second element, that means they have the same priority, and since [3, 1] was pushed earlier, it's higher in `PQ` than [2, 1].

</details>

<details>
<summary>PriorityQueue with objects as nodes</summary>

```js
// The nodes of the PQ are objects of the structure - node: {x: number, y: string}.
// Let's prioritize the nodes first according to the `x` property
// (largest goes on top) and secondly according to the `y` property
// (in lexicographic order).
const compareFn = (childNode, parentNode) => {
  if (childNode.x === parentNode.x) {
    return childNode.y < parentNode.y;
  }
  return childNode.x > parentNode.x;
};

const pq = new PriorityQueue(compareFn);

pq.push({x: 10, y: 'b'}); // expected output: 1
pq.push({x: 10, y: 'a'}); // expected output: 2
pq.push({x: 3, y: 'c'}); // expected output: 3
pq.push({x: 8, y: 'c'}); // expected output: 4
pq.peek(); // expected output: {x: 10, y: 'a'}
pq.pop(); // expected output: {x: 10, y: 'a'}
pq.pop(); // expected output: {x: 10, y: 'b'}
pq.pop(); // expected output: {x: 8, y: 'c'}
pq.pop(); // expected output: {x: 3, y: 'c'}
```

</details>

## Common

### Utility methods (private)

`MinHeap`, `MaxHeap` and `PriorityQueue` classes share the same utility methods:

- `#heapifyUp(idx: number)` (iterative) - Traverse up the heap to find a suitable place for the node at index `idx`. The method is implemented in the `push()` method.
- `#heapifyDown(idx: number)` (iterative) - Traverse down the heap to find a suitable place for the node at index `idx`. The method is implemented in the `pop()` method.
