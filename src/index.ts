import { Transform, TransformCallback } from 'node:stream';
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

const parserMap = new Map([
  ['.js', 'babel'],
  ['.json', 'json'],
]);

class TrimComments extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  async _transform(file: File, _: BufferEncoding, cb: TransformCallback) {
    try {
      if (file.contents === null) {
        throw new Error('File error');
      }

      const parser = parserMap.get(file.extname);
      if (parser === undefined) {
        throw new Error('Applies only to .json and .js files!');
      }

      let text = file.contents.toString();
      text = await prettier.format(text, { parser });

      const trimmer = new TrimCommentsInLine();
      let trimmed = '';
      [...readLineByLine(text)].forEach((line) => {
        trimmed += trimmer.trim(line);
      });

      trimmed = await prettier.format(trimmed, { parser });
      file.contents = Buffer.from(trimmed);
      cb(null, file);
    } catch (err) {
      cb(err as Error);
    }
  }
}

export { TrimComments };
