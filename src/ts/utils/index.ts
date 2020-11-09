export const storage = {
  /**
   * Get data from server.
   * @param {string} key - The key by which the data will be searched.
   */
  async getItem<S>(key: string): Promise<S | null> {
    const response: string | null = localStorage.getItem(key);

    if (response) return JSON.parse(response);

    return null;
  },

  /**
   * Save data on the server.
   * @param {string} key - The key by which the data will be stored.
   * @param {string} value - Data to be saved
   */
  async setItem(key: string, value: string): Promise<void> {
    if (typeof value !== 'string') {
      // eslint-disable-next-line
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  },

  /**
   * Removes data from the server.
   * @param {string} key - The key by which the data will be deleted from
   *   the storage.
   */
  async removeItem(key: string = ''): Promise<void> {
    localStorage.removeItem(key);
  },
};

/**
 * This function creates a new array and fills it with a number.
 * @param { number } start - Starting element of the array.
 * @param { number } end - The last element of the array.
 * @return {Array} - Returns an array of numbers.
 */
export function createArray(start: number, end: number): number[] {
  // eslint-disable-next-line no-param-reassign
  if (start > end) [end, start] = [start, end];
  return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

/**
 * This function compares two values for equality and returns the result
 *   of the comparison to a boolean type.
 * @param {*} a Parameter comparison.
 * @param {*} b Parameter comparison.
 * @return {boolean} - Returns the result of the comparison to a boolean type.
 */
export function isEqual(a: unknown, b: unknown): boolean {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
