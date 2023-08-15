/* For testing */

const { dest, src } = require('gulp');
const { TrimComments } = require('./dist');

function task() {
  return src('test/_manyComments_forTest.*')
    .pipe(new TrimComments())
    .pipe(dest('test/_gulp_result'));
}

exports.default = task;
