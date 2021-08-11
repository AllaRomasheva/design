const {gulp,jsBundler,scssBundler,svgBundler} = require('gulp2go');
const replace = require('gulp-string-replace');
const favicons = require("favicons").stream;
const through = require('through2');

gulp.task('favicon', function(){
    const color = '#4e4cbd';
    const filename = 'favicon.html';
    return gulp.src('assets/favicon.svg')
        .pipe(replace('currentColor',color))
        .pipe(favicons({
            appName: "Alla Romasheva Design",
            appShortName: "Romasheva Design",
            appDescription: "",
            background: color ,
            path: "/assets/favicon/",
            url: "https://romasheva.design/",
            display: "standalone",
            orientation: "portrait",
            scope: "/",
            start_url: "/?homescreen=1",
            version: 1.0,
            logging: false,
            html: filename,
            pipeHTML: true,
            replace: true
        }))
        .pipe(gulp.dest('assets/favicon'))
        .pipe(function(){
            return through.obj(function(file,enc, cb){
                if( file.relative === filename ){
                    cb(null, file);
                } else {
                    cb(null);
                }
            })
        }())
        .pipe(gulp.dest('_includes/carcass'));
});

gulp.task('bootstrap', function(){
    return gulp.src('node_modules/bootstrap/scss/**/*.*')
        .pipe(gulp.dest('assets/scss/bootstrap'))
});

gulp.task('sprite', function(){
    return svgBundler('assets/icons/**/*.svg','sprite.svg','assets');
});

gulp.task('scss',function(){
    return scssBundler('./assets/scss/*.scss','assets/css');
});

gulp.task('js', function(){
    return jsBundler('assets/src/index.js','app.js','assets/js',{
        babelify:{

        },
        schemify:{
            "jquery": "$"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch(['assets/scss/**/*.scss'], gulp.series(['scss']));
    gulp.watch(['assets/build.js','assets/src/**/*.js'], gulp.series(['js']));
});

gulp.task('default', gulp.series(['scss','sprite','js']));
