module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/ts/$1',
  },
  preset: 'jest-puppeteer',
  testTimeout: 999999,
};
