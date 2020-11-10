module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/ts/$1',
  },
  transformIgnorePatterns: ['/node_modules/(?!parody-of-redux).+\\.js$'],
  preset: 'jest-puppeteer',
  testTimeout: 999999,
};
