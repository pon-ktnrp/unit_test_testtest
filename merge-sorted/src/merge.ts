/**
 * Merges three integer arrays into a single ascending-sorted array.
 *
 * @param collection_1 - Already sorted ascending (min → max)
 * @param collection_2 - Already sorted ascending (min → max)
 * @param collection_3 - Already sorted descending (max → min)
 * @returns A single array sorted in ascending order
 *
 */
export function merge(collection_1: number[],collection_2: number[],collection_3: number[]): number[] {
  const result: number[] = [];

  // Pointers for collection_1 and collection_2 (both ascending → read forward)
  let i = 0;
  let j = 0;

  // collection_3 is descending (max → min), so we read it BACKWARD
  // to treat it as ascending without calling any sort function.
  let k = collection_3.length - 1;

  while (
    i < collection_1.length ||
    j < collection_2.length ||
    k >= 0
  ) {
    // Represent exhausted pointers as Infinity so they are never chosen
    const val1 = i < collection_1.length ? collection_1[i] : Number.MAX_SAFE_INTEGER;
    const val2 = j < collection_2.length ? collection_2[j] : Number.MAX_SAFE_INTEGER;
    const val3 = k >= 0               ? collection_3[k] : Number.MAX_SAFE_INTEGER;

    // Pick the smallest of the three current heads
    if (val1 <= val2 && val1 <= val3) {
      result.push(val1);
      i++;
    } else if (val2 <= val1 && val2 <= val3) {
      result.push(val2);
      j++;
    } else {
      result.push(val3);
      k--;
    }
  }

  return result;
}
