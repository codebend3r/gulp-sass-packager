Gulp Sass Packager
====================

> Dynamically imports sass files into one sass file with passed in a config object

    var sassPackager = require('gulp-sass-packager');
    
    gulp.task('sass', function () {
    
      return gulp.src(['app/scss/**/*.scss'])
        .pipe(sassPackager())
        .pipe(gulp.dest('/css'))
    
    });
