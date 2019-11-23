const gulp = require('gulp')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const cssmin = require('gulp-cssmin')
const babel = require('gulp-babel')
const htmlclean = require('gulp-htmlclean')
const htmlmin = require('gulp-htmlmin')
const rename = require('gulp-rename')

gulp.task('html', () => {
    return gulp.src('./src/index.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
    }))
    .pipe(gulp.dest('./'))
})


gulp.task('js', () => {
    return gulp
    .src('./src/js/*.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('css', () => {
    return gulp
    .src('./src/css/*.css')   
    .pipe(cssmin())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./build/css'));
})

gulp.task('img', () => {
    return gulp
    .src('./src/img/*')
    .pipe(imagemin([
        imagemin.jpegtran({progressive: true}),
        imagemin.gifsicle({interlaced: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./build/img'))
})

gulp.task('default', gulp.series(gulp.parallel('html', 'js', 'css', 'img')));
