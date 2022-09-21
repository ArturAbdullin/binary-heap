const MaxHeap = require("../src/MaxHeap");

/**
 * Initialize a max-heap.
 * @param {number} maxSize
 * @param  {...number} nums
 * @returns {MaxHeap} MaxHeap
 */
function maxHeapInit(maxSize, ...nums) {
  let maxHeap = new MaxHeap(maxSize);
  for (const num of nums) {
    maxHeap.push(num);
  }

  return maxHeap;
}

/**
 * Check the current max-heap size after multiple executions of the push() method.
 * @param {{maxSize: number, nums: number[]}} `maxSize` - maximum capacity, `nums` - numbers to add to a heap
 * @returns {number} max-heap current size
 */
function checkCurrentSizeAfterPush({ maxSize, nums }) {
  let maxHeap = maxHeapInit(maxSize, ...nums);
  return maxHeap.size;
}

/**
 * Check the maximum value of a max-heap after multiple executions of the push() method.
 * @param {{maxSize: number, nums: number[]}} `maxSize` maximum capacity, `nums` - numbers to add to a heap
 * @returns {number} max-heap maximum value
 */
function checkMaxValueAfterPush({ maxSize, nums }) {
  let maxHeap = maxHeapInit(maxSize, ...nums);
  return maxHeap.peek();
}

/**
 * Check the maximum value of a max-heap after multiple executions of the pop() method.
 * @param {{maxSize: number, pops: number, nums: number[]}} `maxSize` - maximum capacity, `pops` - number of pop() method executions, `nums` - numbers to add to a heap
 * @returns {number[]} max-heap maximum values at each pop() execution
 */
function checkMaxValueAfterPop({ maxSize, pops, nums }) {
  let maxHeap = maxHeapInit(maxSize, ...nums);
  let result = [];
  for (let i = 0; i < pops; i++) {
    result.push(maxHeap.pop());
  }
  return result;
}

test("check current max-heap size after push() execs", () => {
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

test("check max value of a heap after push() execs", () => {
  expect(
    checkMaxValueAfterPush({
      maxSize: 10,
      nums: [3, 1, 2, 14, 5, 7],
    })
  ).toBe(14);
  expect(
    checkMaxValueAfterPush({
      maxSize: 10,
      nums: [11, 245, 14, 33, 14, 14],
    })
  ).toBe(245);
});

test("check max values after pop() execs", () => {
  expect(
    checkMaxValueAfterPop({
      maxSize: 10,
      pops: 7,
      nums: [5, 7, 1, 3, 24, 14, 14],
    })
  ).toEqual([24, 14, 14, 7, 5, 3, 1]);
  expect(
    checkMaxValueAfterPop({
      maxSize: 10,
      pops: 6,
      nums: [2, 7, 4, 3, 11, 1],
    })
  ).toEqual([11, 7, 4, 3, 2, 1]);
});

test("check return value when a max-heap is empty", () => {
  expect(
    checkMaxValueAfterPop({
      maxSize: 10,
      pops: 4,
      nums: [1, 3],
    })
  ).toEqual([3, 1]);
});
