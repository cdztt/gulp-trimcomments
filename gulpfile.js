const { dest, src } = require('gulp');
const { default: trimCommentsInJson } = require('./dist');

function task() {
  return src('test/test.json')
    .pipe(trimCommentsInJson)
    .pipe(dest('test/gulp_result'));
}

exports.default = task;
