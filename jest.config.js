const baseConfig = require('./jest.base.config.js');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^axios$': '<rootDir>/tests/_mocks/axios.ts',
  },
  testRegex: '/tests/.*\\.test\\.tsx?$',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
