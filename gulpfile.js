const { dest, src } = require('gulp');
const { default: trimCommentsInJson } = require('./src');

function task() {
  return src('test/test.json').pipe(trimCommentsInJson).pipe(dest('test/__'));
}

exports.default = task;
