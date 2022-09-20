const MinHeap = require("../src/MinHeap");

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
 * @param {{maxSize: number, nums: number[]}} `maxSize` - maximum capacity, `nums` - numbers to add to a heap
 * @returns {number} min-heap current size
 */
function checkCurrentSizeAfterPush({ maxSize, nums }) {
  let minHeap = minHeapInit(maxSize, ...nums);
  return minHeap.size;
}

/**
 * Check the minimum value of a min-heap after multiple executions of the push() method.
 * @param {{maxSize: number, nums: number[]}} `maxSize` maximum capacity, `nums` - numbers to add to a heap
 * @returns {number} min-heap minimum value
 */
function checkMinValueAfterPush({ maxSize, nums }) {
  let minHeap = minHeapInit(maxSize, ...nums);
  return minHeap.peek();
}

/**
 * Check the minimum value of a min-heap after multiple executions of the pop() method.
 * @param {{maxSize: number, pops: number, nums: number[]}} `maxSize` - maximum capacity, `pops` - number of pop() method executions, `nums` - numbers to add to a heap
 * @returns {number[]} min-heap minimum values at each pop() execution
 */
function checkMinValueAfterPop({ maxSize, pops, nums }) {
  let minHeap = minHeapInit(maxSize, ...nums);
  let result = [];
  for (let i = 0; i < pops; i++) {
    result.push(minHeap.pop());
  }
  return result;
}

test("check current min-heap size after push() execs", () => {
  expect(
    checkCurrentSizeAfterPush({
      maxSize: 10,
      nums: [1, 2, 3, 5, 7],
    })
  ).toBe(5);
  expect(
    checkCurrentSizeAfterPush({
      maxSize: 3,
      nums: [1, 2, 5, 7, 8],
    })
  ).toBe(3);
});

test("check min value of a heap after push() execs", () => {
  expect(
    checkMinValueAfterPush({
      maxSize: 10,
      nums: [3, 1, 2, 14, 5, 7],
    })
  ).toBe(1);
  expect(
    checkMinValueAfterPush({
      maxSize: 10,
      nums: [11, 245, 14],
    })
  ).toBe(11);
});

test("check min values after pop() execs", () => {
  expect(
    checkMinValueAfterPop({
      maxSize: 10,
      pops: 4,
      nums: [5, 7, 1, 3],
    })
  ).toEqual([1, 3, 5, 7]);
  expect(
    checkMinValueAfterPop({
      maxSize: 10,
      pops: 6,
      nums: [2, 7, 4, 3, 11, 1],
    })
  ).toEqual([1, 2, 3, 4, 7, 11]);
});

test("check return value when a min-heap is empty", () => {
  expect(
    checkMinValueAfterPop({
      maxSize: 10,
      pops: 4,
      nums: [1, 3],
    })
  ).toEqual([1, 3]);
});
