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
   * @returns {boolean} `true` if the heap size is not exceeded, or `false` otherwise. 
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
      [childIdx, parentIdx] = [parentIdx, Math.floor(parentIdx / 2)];
    }
  }

  /**
   * Removes the min heap element and returns it. If the heap is empty returns `undefined` and the heap is not modified.
   * @returns {number | undefined} min element
   */
  pop() {
    if (this.#currSize <= 0) return undefined;
    const minVal = this.#heap[1];

    if (this.#currSize === 1) {
      this.#heap[1] = undefined;
      this.#currSize--;
      return minVal;
    }

    if (this.#currSize === 2) {
      [this.#heap[1], this.#heap[2]] = [this.#heap[2], undefined];
      this.#currSize--;
      return minVal;
    }

    this.#heap[1] = this.#heap[this.#currSize];
    this.#heap[this.#currSize] = undefined;
    this.#currSize--;
    this.#heapifyDown(1);
    return minVal;
  }

  /**
   * Traverse down the heap to find a suitable place for the number at index `idx`.
   * @param {number} idx
   */
  #heapifyDown(idx) {
    let parentIdx = idx;
    let [leftChildIdx, rightChildIdx] = this.#leftRightFrom(parentIdx);

    while (
      this.#heap[parentIdx] > this.#heap[leftChildIdx] ||
      this.#heap[parentIdx] > this.#heap[rightChildIdx]
    ) {
      if (this.#heap[rightChildIdx]) {
        if (this.#heap[leftChildIdx] < this.#heap[rightChildIdx]) {
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
   * Swap heap elements at `idx1` and `idx2`
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
}

module.exports = MinHeap;