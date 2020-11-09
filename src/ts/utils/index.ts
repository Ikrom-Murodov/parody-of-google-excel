import { TRootState } from '@/store';

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

  /**
   * Receives all data from the server.
   * @return {Promise<TRootState[]>} - Returns data received from the server
   *   asynchronously.
   */
  async getAllData(): Promise<TRootState[]> {
    const data: TRootState[] = [];

    for (let i = 0; i < localStorage.length; i += 1) {
      const key: string | null = localStorage.key(i);
      if (key?.includes('table')) {
        const item = localStorage.getItem(key) as string;
        data.push(JSON.parse(item));
      }
    }

    return data;
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

/**
 * This function creates and returns a random identifier.
 * @param {number} length - identifier length.
 * @return {string} - returns a random identifier.
 */
export const uid = ((): ((length: number) => string) => {
  const rand = (min: number, max: number): number =>
    Math.floor(min + Math.random() * (max + 1 - min));

  return (length: number = 10): string => {
    let id: string = '';
    for (let i = 0; i < length; i += 1) {
      id += String.fromCharCode(rand(97, 122));
    }

    return id;
  };
})();

/**
 *
 * @param {string} value - Data that needs to be processed.
 * @return {string} - The result of processing will return as a string.
 * @example
 *  parse('=10+10-5*5') // '-5'
 */
export function parse(value: string = ''): string {
  if (value.startsWith('=')) {
    try {
      // eslint-disable-next-line
      return eval(value.slice(1));
    } catch (e) {
      return value;
    }
  }

  return value;
}
