const config = {
  clearMocks: true,
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testRegex: /\/*\//g,
  testRegex2: /(\/__tests__\/.*|(\\.|\/)(test|spec))\\.[jt]sx?$/,
  testRegex3: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  transformIgnorePatterns: ["\\\\node_modules\\\\", "\\.pnp\\.[^\\\\]+$"],
};
module.exports = config;
