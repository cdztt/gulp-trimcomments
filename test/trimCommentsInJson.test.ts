import { expect, test } from '@jest/globals';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import File from 'vinyl';
import trimComments from '../src';

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

let result = '';

function* readable(fileName: string) {
  const contents = readFileSync(path.resolve(__dirname, fileName));
  const file = new File({ contents });
  yield file;
}

function write(
  file: File,
  _: BufferEncoding,
  cb: (error?: Error | null) => void
) {
  if (file.contents !== null) {
    result = file.contents.toString();
    cb();
  } else {
    cb(new Error('File error'));
  }
}

test('', async () => {
  const writable = new Writable({ objectMode: true, write });
  await pipeline(readable('test.json'), trimComments, writable);
  expect(result).toBe(expected);
});
