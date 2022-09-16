/**
 * Creates a new min-heap
 */
class MinHeap {
  #currSize;
  #heap;
  #maxHeapSize;
  /**
   * @param {number} maxSize The maximum number of elements in a heap.
   */
  constructor(maxSize) {
    /**
     * @type {(number | undefined)[]}
     */
    this.#heap = new Array(maxSize + 1).fill(undefined);
    this.#maxHeapSize = maxSize == undefined || maxSize < 0 ? 0 : maxSize;
    this.#currSize = 0;
  }

  /**
   * Heap's current size.
   */
  get size() {
    return this.#currSize;
  }

  /**
   * Heap's max size.
   */
  get maxSize() {
    return this.#maxHeapSize;
  }

  /**
   * Return the top min heap number or `undefined` if the heap is empty. The heap is not modified.
   * @returns {number | undefined} min number or `undefined`.
   */
  peek() {
    if (this.#currSize <= 0) return undefined;
    else return this.#heap[1];
  }

  /**
   * Add a number to the heap.
   * @param {number} num
   */
  push(num) {
    if (this.#currSize + 1 > this.#maxHeapSize) {
      return false;
    }

    this.#currSize++;
    this.#heap[this.#currSize] = num;

    this.#heapifyUp(this.#currSize);
    return true;
  }

  /**
   * Traverse up the heap to find a suitable place for the number at index `idx`.
   * @param {number} idx index.
   */
  #heapifyUp(idx) {
    let childIdx = idx;
    let parentIdx = Math.floor(childIdx / 2);

    while (childIdx > 1 && this.#heap[parentIdx] > this.#heap[childIdx]) {
      [this.#heap[parentIdx], this.#heap[childIdx]] = [
        this.#heap[childIdx],
        this.#heap[parentIdx],
      ];
      [childIdx, parentIdx] = [parentIdx, Math.floor(childIdx / 2)];
    }
  }
}
