const MinHeap = require("./MinHeap");

/**
 * Initialize a min-heap.
 * @param {number} maxSize
 * @param  {...number} nums
 * @returns {MinHeap} MinHeap
 */
function minHeapInit(maxSize, ...nums) {
  let minHeap = new MinHeap(maxSize);
  for (const num of nums) {
    minHeap.push(num);
  }

  return minHeap;
}

/**
 * Check the current min-heap size after multiple executions of the push() method.
 * @param {number} maxSize
 * @param  {...number} nums numbers to add to a heap
 * @returns {number} min-heap current size
 */
function checkCurrentSizeAfterPush(maxSize, ...nums) {
  let minHeap = minHeapInit(maxSize, ...nums);
  return minHeap.size;
}

/**
 * Check the minimum value of a min-heap after multiple executions of the push() method.
 * @param {number} maxSize
 * @param  {...number} nums numbers to add to a heap
 * @returns {number} min-heap minimum value
 */
function checkMinValueAfterPush(maxSize, ...nums) {
  let minHeap = minHeapInit(maxSize, ...nums);
  return minHeap.peek();
}

/**
 * Check the minimum value of a min-heap after multiple executions of the pop() method.
 * @param {number} maxSize
 * @param {number} pops number of pop() method executions
 * @param  {...number} nums numbers to add to a heap
 * @returns {number[]} min-heap minimum values at each pop() execution
 */
function checkMinValueAfterPop(maxSize, pops, ...nums) {
  let minHeap = minHeapInit(maxSize, ...nums);
  let result = [];
  for (let i = 0; i < pops; i++) {
    result.push(minHeap.pop());
  }
  return result;
}

test("check current min-heap size after push() execs", () => {
  expect(checkCurrentSizeAfterPush(10, 1, 2, 3, 5, 7)).toBe(5);
  expect(checkCurrentSizeAfterPush(3, 1, 2, 5, 7, 8)).toBe(3);
});

test("check min value of a heap after push() execs", () => {
  expect(checkMinValueAfterPush(10, 3, 1, 2, 14, 5, 7)).toBe(1);
  expect(checkMinValueAfterPush(10, 11, 245, 14)).toBe(11);
});

test("check min values after pop() execs", () => {
  expect(checkMinValueAfterPop(10, 4, 5, 7, 1, 3)).toEqual([1, 3, 5, 7]);
  expect(checkMinValueAfterPop(10, 6, 2, 7, 4, 3, 11, 1)).toEqual([1, 2, 3, 4, 7, 11]);
});
