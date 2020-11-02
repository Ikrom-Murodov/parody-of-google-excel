export const storage = {
  /**
   * Get data from server.
   * @param {string} key - The key by which the data will be searched.
   */
  async getItem(key: string): Promise<unknown> {
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
};
