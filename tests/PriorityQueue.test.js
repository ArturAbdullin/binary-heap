const PriorityQueue = require("../src/PriorityQueue");

/**
 * Initialize a PriorityQueue instance.
 * @param {any[]} nodes
 * @param {(a: any, b: any) => boolean} compareFn
 */
function initPQ(nodes, compareFn) {
  let pQueue = new PriorityQueue(compareFn);

  for (let node of nodes) {
    pQueue.push(node);
  }

  return pQueue;
}

/**A type donor for check function options*/
const heapOptions = {
  popsCnt: 0,
  compareFn: (a, b) => true,
};

/**A type donor for check function return*/
const basicHeapCheckReturn = {
  peekAfterInit: 0,
  peekAfterPops: 0,
  pops: [0],
};

/**
 * @param {number[]} nodes
 * @param {heapOptions} options
 * @returns {basicHeapCheckReturn}
 */
function checkMinHeap(nodes, options) {
  let minHeap = initPQ(nodes, (a, b) => a < b);
  let peek = minHeap.peek();
  let pops = [];
  for (let i = 0; i < options.popsCnt; i++) {
    pops.push(minHeap.pop());
  }

  return { peekAfterInit: peek, pops: pops };
}

/**
 * @param {number[]} nodes
 * @param {heapOptions} options
 * @returns {basicHeapCheckReturn}
 */
function checkMaxHeap(nodes, options) {
  let maxHeap = initPQ(nodes, options.compareFn);
  let peekBefor = maxHeap.peek();
  let pops = [];
  for (let i = 0; i < options.popsCnt; i++) {
    pops.push(maxHeap.pop());
  }

  let peekAfter = maxHeap.peek();

  return {
    peekAfterInit: peekBefor,
    peekAfterPops: peekAfter,
    pops: pops,
  };
}

/**A type donor for check function return*/
const pqCheckWithArraysReturn = {
  peekAfterInit: [1, "1", true, undefined, null],
  peekAfterPops: [1, "1", true, undefined, null],
  pops: [
    [1, "1", true, undefined, null],
    [1, "1", true, undefined, null],
  ],
};

/**
 *
 * @param {any[]} nodes
 * @param {heapOptions} options
 * @returns {pqCheckWithArraysReturn}
 */
function checkWithArrays(nodes, options) {
  let pq = initPQ(nodes, options.compareFn);
  let peekAfterInit = pq.peek();
  let pops = [];
  for (let i = 0; i < options.popsCnt; i++) {
    pops.push(pq.pop());
  }
  let peekAfterPops = pq.peek();

  return {
    peekAfterInit: peekAfterInit,
    peekAfterPops: peekAfterPops,
    pops: pops,
  };
}

/**A type donor for check function return*/
const pqCheckWithObjectsReturn = {
  peekAfterInit: {},
  peekAfterPops: {},
  pops: [{}],
};

/**
 * @param {object[]} nodes
 * @param {heapOptions} options
 * @returns {pqCheckWithObjectsReturn}
 */
function checkWithObjects(nodes, options) {
  let pq = initPQ(nodes, options.compareFn);
  let peekAfterInit = pq.peek();
  let pops = [];
  for (let i = 0; i < options.popsCnt; i++) {
    pops.push(pq.pop());
  }
  let peekAfterPops = pq.peek();

  return {
    peekAfterInit: peekAfterInit,
    peekAfterPops: peekAfterPops,
    pops: pops,
  };
}

test("priority queue initialization", () => {
  expect(initPQ([1, 2, 5, 3, 6], (a, b) => a < b).peek()).toBe(1);
  expect(initPQ([1, 2, 5, 3, 6], (a, b) => a > b).peek()).toBe(6);
});

test("check PriorityQueue as a min-heap", () => {
  expect(checkMinHeap([1, 66, 3, 27, 2], { popsCnt: 3 })).toStrictEqual({
    peekAfterInit: 1,
    pops: [1, 2, 3],
  });
});

test("check PriorityQueue as a max-heap", () => {
  expect(
    checkMaxHeap([6, 2, 1, 0, 18, 9], {
      compareFn: (a, b) => a > b,
      popsCnt: 4,
    })
  ).toStrictEqual({ peekAfterInit: 18, peekAfterPops: 1, pops: [18, 9, 6, 2] });
});

test("check PriorityQueue with arrays as nodes", () => {
  expect(
    checkWithArrays(
      [
        [1, 5],
        [2, 4],
        [3, 3],
        [4, 2],
        [5, 1],
      ],
      { compareFn: (a, b) => a[0] > b[0], popsCnt: 3 }
    )
  ).toStrictEqual({
    peekAfterInit: [5, 1],
    peekAfterPops: [2, 4],
    pops: [
      [5, 1],
      [4, 2],
      [3, 3],
    ],
  });
});

class TestObj {
  /**
   * @param {number} x
   * @param {string} y
   * @param {number} z
   */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

test("check PriorityQueue with objects as nodes", () => {
  expect(
    checkWithObjects(
      [
        new TestObj(1, "a", 3),
        new TestObj(2, "d", 1),
        new TestObj(2, "c", 2),
        new TestObj(2, "b", 3),
        new TestObj(2, "b", 1),
        new TestObj(1, "aa", 3),
        new TestObj(3, "a", 1),
      ],
      {
        popsCnt: 5,
        compareFn: (a, b) => {
          if (a.x === b.x) {
            return a.y < b.y;
          } else {
            return a.x > b.x;
          }
        },
      }
    )
  ).toStrictEqual({
    peekAfterInit: new TestObj(3, "a", 1),
    peekAfterPops: new TestObj(1, "a", 3),
    pops: [
      new TestObj(3, "a", 1),
      new TestObj(2, "b", 3),
      new TestObj(2, "b", 1),
      new TestObj(2, "c", 2),
      new TestObj(2, "d", 1),
    ],
  });
});
