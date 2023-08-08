# Remove comments from the JSON file

1. npm i -D @cdztt/gulp-trimcomments
1. Write the following code in the gulpfile .js file

```javascript
const { src, dest } = require('gulp');
const trimComments = require('@cdztt/gulp-trimcomments');

function task() {
  return src('test.json' /* The target JSON file to process */)
    .pipe(trimComments)
    .pipe(dest('./' /* Modify the file in place */));
}

exports.default = task;
```
