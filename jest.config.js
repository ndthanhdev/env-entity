module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  globals: {
    'ts-jest': {
      tsConfig: 'test/tsconfig.json',
    },
  },
}
