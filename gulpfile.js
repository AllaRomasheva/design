var gulp     = require('gulp');
var sass     = require('gulp-sass');
var svgSprite  =  require('gulp-svg-sprite');
var rename = require("gulp-rename");

var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');
var del        = require('del');
var view       = require('jquery.control/view');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var touch = require('gulp-touch-fd');


gulp.task('bootstrap', function(){
    return gulp.src('node_modules/bootstrap/scss/**/*.*')
        .pipe(gulp.dest('assets/scss/bootstrap'))
});

gulp.task('scss',function(){
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'))
        .pipe(touch());
});

gulp.task('sprite', function(){
    return gulp.src('_includes/icons/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "./sprite.svg"
                }
            }
        }))
        .pipe(rename(function () {
            return {
                dirname: '',
                basename: 'sprite',
                extname: '.svg'
            };
        }))
        .pipe(gulp.dest('assets/sprite'));
});

gulp.task('js:app', function(){
    return gulp.src([
        'assets/build.js'
    ]).pipe(browserify({
        paths: [
            './node_modules',
            './assets'
        ]
    })).pipe(rename('index.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({extname:'.min.js'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'))
        .pipe(touch());
});


gulp.task('js:lib', function(){
    return gulp.src([
        'node_modules/jquery/dist/jquery.js'
    ]).pipe(concat('vendor.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({extname:'.min.js'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'))
        .pipe(touch());
});

gulp.task('js', gulp.series(['js:lib','js:app']))

gulp.task('watch', function(){
    gulp.watch(['assets/scss/**/*.scss'], gulp.series(['scss']));
    gulp.watch(['assets/build.js','assets/src/**/*.js'], gulp.series(['js:app']));
});


gulp.task('default', gulp.series(['scss','sprite','js']));