const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'dist',
    },
  });
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('build-html', () => {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
})

gulp.task('build-js', () => {
  return gulp
    .src('src/js/script.js')
    .pipe(uglify({
      toplevel: true
    }))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () => {
  return gulp.src("src/img/**/*")
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"));
});

gulp.task('styles', () => {
  return gulp
    .src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'));
  gulp.watch('src/js/**/*.js', gulp.parallel('build-js'));
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('src/*.html', gulp.parallel('build-html'))
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles','images'));
