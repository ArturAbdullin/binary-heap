/**
 * Creates a new PriorityQueue (heap)
 */
class PriorityQueue {
  #currSize;
  #heap;
  /**@type {(childNode: any, neighborNode: any) => boolean}*/
  #compareFn;
  /**
   * @param {(childNode: any, parentNode: any) => boolean} [compareFn]
   * `compareFn` - used to determine the order (priority) of the nodes in a heap. It is expected to return a `boolean` value. When `true` is returned, it means that `childNode` has a higher priority than `parentNode`. If omitted, the nodes prioritized according the function (`min-heap`):
   *```ts
   * constructor((childNode, parentNode) => childNode < parentNode)
   * ```
   */
  constructor(compareFn) {
    this.#compareFn =
      compareFn !== undefined
        ? compareFn
        : (childNode, parentNode) => childNode < parentNode;
    /**
     * @type {(any | undefined)[]}
     */
    this.#heap = [undefined];
    this.#currSize = 0;
  }

  /**
   * Heap's current size.
   */
  get size() {
    return this.#currSize;
  }

  /**
   * Return the top heap node or `undefined` if the heap is empty. The heap is not modified.
   * @returns {any | undefined} top node or `undefined`.
   */
  peek() {
    if (this.#currSize <= 0) return undefined;
    else return this.#heap[1];
  }

  /**
   * Add a node to the heap.
   * @param {any} node
   * @returns {number} current heap size
   */
  push(node) {
    this.#currSize++;
    this.#heap[this.#currSize] = node;

    this.#heapifyUp(this.#currSize);
    return this.#currSize;
  }

  /**
   * Traverse up the heap to find a suitable place for the node at index `idx`.
   * @param {number} idx index.
   */
  #heapifyUp(idx) {
    let childIdx = idx;
    let parentIdx = Math.floor(childIdx / 2);
    while (
      childIdx > 1 &&
      this.#compareFn(this.#heap[childIdx], this.#heap[parentIdx])
    ) {
      [this.#heap[parentIdx], this.#heap[childIdx]] = [
        this.#heap[childIdx],
        this.#heap[parentIdx],
      ];
      [childIdx, parentIdx] = [parentIdx, Math.floor(parentIdx / 2)];
    }
  }

  /**
   * Removes the top heap node and returns it. If the heap is empty returns `undefined` and the heap is not modified.
   * @returns {any | undefined} top node
   */
  pop() {
    if (this.#currSize <= 0) return undefined;
    const topNode = this.#heap[1];

    if (this.#currSize === 1) {
      this.#heap.pop();
      this.#currSize--;
      return topNode;
    }

    if (this.#currSize === 2) {
      this.#heap[1] = this.#heap[2];
      this.#heap.pop();
      this.#currSize--;
      return topNode;
    }

    this.#heap[1] = this.#heap[this.#currSize];
    this.#heap.pop();
    this.#currSize--;
    this.#heapifyDown(1);
    return topNode;
  }

  /**
   * Traverse down the heap to find a suitable place for the node at index `idx`.
   * @param {number} idx
   */
  #heapifyDown(idx) {
    let parentIdx = idx;
    let [leftChildIdx, rightChildIdx] = this.#leftRightFrom(parentIdx);

    while (
      (this.#isWithinTheHeapSize(leftChildIdx, parentIdx) &&
        this.#compareFn(this.#heap[leftChildIdx], this.#heap[parentIdx])) ||
      (this.#isWithinTheHeapSize(rightChildIdx) &&
        this.#compareFn(this.#heap[rightChildIdx], this.#heap[parentIdx]))
    ) {
      if (this.#heap[rightChildIdx]) {
        if (
          this.#compareFn(this.#heap[leftChildIdx], this.#heap[rightChildIdx])
        ) {
          this.#swap(leftChildIdx, parentIdx);
          parentIdx = leftChildIdx;
        } else {
          this.#swap(rightChildIdx, parentIdx);
          parentIdx = rightChildIdx;
        }
      } else {
        this.#swap(leftChildIdx, parentIdx);
        parentIdx = leftChildIdx;
      }
      [leftChildIdx, rightChildIdx] = this.#leftRightFrom(parentIdx);
    }
  }

  /**
   * Swap heap nodes at `idx1` and `idx2`
   * @param {number} idx1
   * @param {number} idx2
   */
  #swap(idx1, idx2) {
    [this.#heap[idx1], this.#heap[idx2]] = [this.#heap[idx2], this.#heap[idx1]];
  }

  /**
   * Return left and right children indices of a parent at `idx`
   * @param {number} idx parent index.
   * @returns {number[]} left and right children indices.
   */
  #leftRightFrom(idx) {
    return [idx * 2, idx * 2 + 1];
  }

  /**
   * @param  {...number} idxs
   */
  #isWithinTheHeapSize(...idxs) {
    for (let idx of idxs) if (idx > this.#currSize) return false;
    return true;
  }
}

module.exports = PriorityQueue;
