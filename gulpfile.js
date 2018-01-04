var gulp = require('gulp');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browserSync', ['html', 'sass', 'img'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch('./src/index.html', ['html'])
    gulp.watch('./src/scss/*.scss', ['sass'])
});

// HTML
gulp.task('html', function() {
    return gulp.src('./src/index.html')
      .pipe(html({collapseWhitespace:true}))
      .pipe(gulp.dest('./dist/'))
      .pipe(browserSync.stream())
});

// SASS
gulp.task('sass',['html'], function() {
    return gulp.src('./src/scss/style.scss')
      .pipe(sass({outputStyle:"compressed"}))
    	.on("error", notify.onError("Error: <%= error.message %>"))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream())
});

// IMG
gulp.task('img', function() {
    gulp.src('./src/img/*')
      .pipe(gulp.dest('./dist/img/'));
});

gulp.task('default',['browserSync'], function() {
    
});