# merge-sorted

Merges three integer arrays into a single ascending-sorted array **without using any sort function**.

## Input Contract

| Parameter      | Order               |
|----------------|---------------------|
| `collection_1` | Ascending (min → max) |
| `collection_2` | Ascending (min → max) |
| `collection_3` | Descending (max → min) |

## Algorithm

1. `collection_1` and `collection_2` are already ascending — read them **forward** with pointers `i`, `j`.
2. `collection_3` is descending — read it **backward** with pointer `k` (starting at the last index) so it behaves as ascending without sorting.
3. At each step pick the **smallest** of the three current heads and advance that pointer — identical to the merge step in Merge Sort.

**Time complexity:** O(n₁ + n₂ + n₃)  
**Space complexity:** O(n₁ + n₂ + n₃)

## Setup

**Prerequisites:** Node.js ≥ 18

```bash
# 1. Clone / download the project, then:
cd merge-sorted

# 2. Install dependencies
npm install
```

## Run Tests

```bash
# Run all unit tests
npm test

# Run with coverage report
npm run test:coverage
```

## Build

```bash
npm run build
# Compiled output → ./dist/
```

## Project Structure

```
merge-sorted/
├── src/
│   └── merge.ts          # Implementation
├── tests/
│   └── merge.test.ts     # Unit tests (17 cases)
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Usage Example

```typescript
import { merge } from "./src/merge";

const c1 = [1, 4, 7];   // ascending
const c2 = [2, 5, 8];   // ascending
const c3 = [9, 6, 3];   // descending

console.log(merge(c1, c2, c3));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
