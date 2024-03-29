import path from 'path';

export default {
  globals: {
    __IS_DEV__: true,
    __API__: '',
    __PROJECT__: 'jest',
  },
  clearMocks: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  modulePaths: ['<rootDir>src'],
  rootDir: '../../',
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
    '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    '^@/shared(.*)$': '<rootDir>/src/shared$1',
    '^@/entities(.*)$': '<rootDir>/src/entities$1',
    '^@/features(.*)$': '<rootDir>/src/features$1',
    '^@/widgets(.*)$': '<rootDir>/src/widgets$1',
    '^@/pages(.*)$': '<rootDir>/src/pages$1',
    '^@/app(.*)$': '<rootDir>/src/app$1',
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: '<rootDir>/reports/unit',
        filename: 'report.html',
        openReport: true,
        inlineSource: true,
      },
    ],
  ],
};
