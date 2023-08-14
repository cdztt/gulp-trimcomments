import { expect, test } from '@jest/globals';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import File from 'vinyl';
import { TrimComments } from '../src';

function* readable(fileName: string) {
  const filePath = path.resolve(__dirname, fileName);
  const contents = readFileSync(filePath);
  const file = new File({ contents, path: filePath });
  yield file;
}

class WriteResult extends Writable {
  value: string;

  constructor() {
    super({ objectMode: true });
    this.value = '';
  }

  _write(file: File, _: BufferEncoding, cb: (error?: Error | null) => void) {
    this.value = (file.contents as Buffer).toString();
    cb();
  }
}

test('Test files with illegal extensions', async () => {
  expect.assertions(1);
  try {
    await pipeline(readable('trimCommentsInJson.test.ts'), new TrimComments());
  } catch (err) {
    expect((err as Error).message).toMatch(
      /Applies only to .json and .js files!/
    );
  }
});

test('Test the .json file', async () => {
  const expected = `{
  "compilerOptions": {
    "target": "es2021",
    "module": "UMD",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}
`;
  const result = new WriteResult();

  await pipeline(
    readable('_manyComments_forTest.json'),
    new TrimComments(),
    result
  );

  expect(result.value).toBe(expected);
});

test('Test the .js file', async () => {
  const expected = String.raw`const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
  transformIgnorePatterns: ["\\\\node_modules\\\\", "\\.pnp\\.[^\\\\]+$"],
};
module.exports = config;
`;
  const result = new WriteResult();

  await pipeline(
    readable('_manyComments_forTest.js'),
    new TrimComments(),
    result
  );
  expect(result.value).toBe(expected);
});
