process.env.TZ = 'GMT';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!**/node_modules/**"
  ],
  coverageReporters: [
    "lcov",
    "text"
  ],
  setupFilesAfterEnv: [
    "jest-mock-console/dist/setupTestFramework.js",
  ]
};