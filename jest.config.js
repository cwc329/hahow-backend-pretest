const fs                          = require('node:fs');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions }         = require('./tsconfig.json');

const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'));
module.exports = {
  transform: {
    '^.+\\.ts?$': [
      '@swc/jest',
      { ...swcConfig },
    ],
  },
  testRegex: '/tests/.*\\.test\\.tsx?$',
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '^axios$': '<rootDir>/_mocks/axios.ts',
  },
  setupFiles: ['<rootDir>/jest-setup-file.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
