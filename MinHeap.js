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
     * @type {(number | null)[]}
     */
    this.#heap = new Array(maxSize + 1).fill(null);
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
   * Return the top min heap number or null if the heap is empty.
   * @returns {number | null} min number or null.
   */
  peek() {
    if (this.#currSize <= 0) return null;
    else return this.#heap[1];
  }

  /**
   * Add a number to the heap.
   * @param {number} num
   */
  push(num) {}
}