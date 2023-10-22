module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/'],
  detectOpenHandles: true,
  collectCoverage: true,
  collectCoverageFrom: ['/src/**/*.{ts}'],
  setupFilesAfterEnv: ['./tests/mocks.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.test.ts']
}
