
module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testMatch: [
    "**/utils/**/*.test.ts",
    "**/utils/**/*.test.tsx",
    "**/pages/**/*.jest.test.tsx",
    "**/pages/**/*.rtl.test.tsx"
  ],

  clearMocks: true
};
