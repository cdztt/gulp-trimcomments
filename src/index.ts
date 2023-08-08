import { Transform } from 'node:stream';
import prettier from 'prettier';
import File from 'vinyl';
import TrimCommentsInLine from './TrimCommentsInLine';

function* readLineByLine(text: string) {
  const regexEol = new RegExp(/\r?\n/, 'g');
  let result;
  let prevLastIndex;
  while (
    ((prevLastIndex = regexEol.lastIndex), (result = regexEol.exec(text)))
  ) {
    yield text.slice(prevLastIndex, result.index);
  }
  yield text.slice(prevLastIndex);
}

async function transform(
  file: File,
  _: BufferEncoding,
  cb: (error?: Error | null, data?: File) => void
) {
  try {
    if (file.contents !== null) {
      const text = file.contents.toString();
      const trimmer = new TrimCommentsInLine();
      let trimmed = '';

      [...readLineByLine(text)].forEach((line) => {
        trimmed += trimmer.trim(line);
      });
      trimmed = await prettier.format(trimmed, { parser: 'json' });
      file.contents = Buffer.from(trimmed);
    }
    cb(null, file);
  } catch (err) {
    cb(err as Error);
  }
}

const trimComments = new Transform({ objectMode: true, transform });
export = trimComments;
