import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/__tests__/mocks/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default createJestConfig(config);