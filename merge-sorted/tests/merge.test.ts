import { merge } from "../src/merge";

// ─── helpers ────────────────────────────────────────────────────────────────

/** Verify the result is strictly non-decreasing */
function isAscending(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

// ─── tests ───────────────────────────────────────────────────────────────────

describe("merge(collection_1, collection_2, collection_3)", () => {

  // ── basic correctness ────────────────────────────────────────────────────

  test("merges three typical arrays into ascending order", () => {
    const c1 = [1, 4, 7];          // ascending
    const c2 = [2, 5, 8];          // ascending
    const c3 = [9, 6, 3];          // descending

    const result = merge(c1, c2, c3);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(isAscending(result)).toBe(true);
  });

  test("result contains all elements from all three collections", () => {
    const c1 = [1, 3, 5];
    const c2 = [2, 4, 6];
    const c3 = [12, 9, 7];

    const result = merge(c1, c2, c3);
    const expected = [...c1, ...c2, ...c3].length;

    expect(result.length).toBe(expected);
    expect(isAscending(result)).toBe(true);
  });

  // ── edge: empty arrays ───────────────────────────────────────────────────

  test("returns empty array when all collections are empty", () => {
    expect(merge([], [], [])).toEqual([]);
  });

  test("handles collection_1 empty", () => {
    const result = merge([], [1, 3, 5], [6, 4, 2]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    expect(isAscending(result)).toBe(true);
  });

  test("handles collection_2 empty", () => {
    const result = merge([1, 3, 5], [], [6, 4, 2]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    expect(isAscending(result)).toBe(true);
  });

  test("handles collection_3 empty", () => {
    const result = merge([1, 3, 5], [2, 4, 6], []);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    expect(isAscending(result)).toBe(true);
  });

  test("handles two collections empty, only collection_1 has data", () => {
    const result = merge([1, 2, 3], [], []);
    expect(result).toEqual([1, 2, 3]);
  });

  test("handles two collections empty, only collection_3 has data", () => {
    const result = merge([], [], [5, 3, 1]);
    expect(result).toEqual([1, 3, 5]);
  });

  // ── edge: single-element arrays ──────────────────────────────────────────

  test("handles single-element arrays", () => {
    const result = merge([3], [1], [2]);   // c3 descending: [2] is valid
    expect(result).toEqual([1, 2, 3]);
    expect(isAscending(result)).toBe(true);
  });

  // ── duplicates ───────────────────────────────────────────────────────────

  test("handles duplicate values across collections", () => {
    const c1 = [1, 2, 3];
    const c2 = [2, 3, 4];
    const c3 = [4, 3, 2];

    const result = merge(c1, c2, c3);

    expect(result.length).toBe(9);
    expect(isAscending(result)).toBe(true);
    expect(result).toEqual([1, 2, 2, 2, 3, 3, 3, 4, 4]);
  });

  test("handles all elements being equal", () => {
    const result = merge([5, 5], [5, 5], [5, 5]);
    expect(result).toEqual([5, 5, 5, 5, 5, 5]);
    expect(isAscending(result)).toBe(true);
  });

  // ── negative numbers ─────────────────────────────────────────────────────

  test("handles negative numbers", () => {
    const c1 = [-10, -5, 0];
    const c2 = [-8, -3, 2];
    const c3 = [7, 1, -6];

    const result = merge(c1, c2, c3);

    expect(isAscending(result)).toBe(true);
    expect(result).toEqual([-10, -8, -6, -5, -3, 0, 1, 2, 7]);
  });

  // ── unequal lengths ──────────────────────────────────────────────────────

  test("handles collections of different lengths", () => {
    const c1 = [1];
    const c2 = [2, 4, 6, 8, 10];
    const c3 = [9, 7, 5, 3];

    const result = merge(c1, c2, c3);

    expect(result.length).toBe(10);
    expect(isAscending(result)).toBe(true);
  });

  // ── non-overlapping ranges ───────────────────────────────────────────────

  test("handles completely non-overlapping ranges", () => {
    const c1 = [1, 2, 3];
    const c2 = [4, 5, 6];
    const c3 = [9, 8, 7];

    const result = merge(c1, c2, c3);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test("handles ranges where c1 is entirely larger than c2 and c3", () => {
    const c1 = [100, 200, 300];
    const c2 = [1, 2, 3];
    const c3 = [9, 6, 4];

    const result = merge(c1, c2, c3);

    expect(isAscending(result)).toBe(true);
    expect(result[0]).toBe(1);
    expect(result[result.length - 1]).toBe(300);
  });

  // ── large input ──────────────────────────────────────────────────────────

  test("handles large arrays efficiently", () => {
    const size = 10_000;
    const c1 = Array.from({ length: size }, (_, i) => i * 3);         // 0,3,6,...
    const c2 = Array.from({ length: size }, (_, i) => i * 3 + 1);     // 1,4,7,...
    const c3 = Array.from({ length: size }, (_, i) =>                  // descending: 29999,29996,...
      (size - 1 - i) * 3 + 2
    );

    const result = merge(c1, c2, c3);

    expect(result.length).toBe(size * 3);
    expect(isAscending(result)).toBe(true);
    expect(result[0]).toBe(0);
    expect(result[result.length - 1]).toBe((size - 1) * 3 + 2);
  });
});
