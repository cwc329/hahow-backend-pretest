const baseConfig = require('./jest.base.config.js');

module.exports = {
  ...baseConfig,
  testRegex: '/integrationTests/.*\\.test\\.tsx?$',
  setupFiles: [ ...baseConfig.setupFiles, '<rootDir>/jest-integration-setup-file.ts'],
};
