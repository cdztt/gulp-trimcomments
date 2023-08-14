# Remove comments from the .js or .json file

1. npm i -D @cdztt/gulp-trimcomments
1. Write the following code in the gulpfile .js file

```javascript
const { src, dest } = require('gulp');
const { TrimComments } = require('@cdztt/gulp-trimcomments');

function task() {
  return src('test.json' /* The target .js or .json file to process */)
    .pipe(new TrimComments())
    .pipe(dest('./' /* Modify the file in place */));
}

exports.default = task;
```

[wiki](https://github.com/cdztt/gulp-trimcomments/wiki)
