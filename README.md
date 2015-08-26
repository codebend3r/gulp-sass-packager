Gulp Sass Packager
====================
![gulp-sass-packager build status](https://travis-ci.org/crivas/gulp-sass-packager.svg?branch=master)

> Dynamically imports sass files into one sass file with passed in a config object

```js
var sassPackager = require('gulp-sass-packager');

gulp.task('sass', function () {

  return gulp.src(['app/scss/**/*.scss'])
    .pipe(sassPackager({
      packageJSON: './sass-config.json'
    }))
    .pipe(gulp.dest('/css'))

});
```

Example of a config object
```js
{
  "components": {
    "scss/file1": true,
    "scss/file2": true,
    "scss/feature/file10": true,
    "scss/feature/file11": false,
    "scss/feature/file14": true,
    "scss/file4": true
  }
}
```
