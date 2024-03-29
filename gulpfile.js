const {gulp,jsBundler,scssBundler,svgBundler} = require('gulp2go');

const replace = require('gulp-string-replace');
const favicons = require("favicons");
const through = require('through2');
const fs = require('fs');

gulp.task('favicon', function(){
    const color = '#202020';
    const filename = 'favicon.html';
    const iconFile = 'assets/favicon.svg';
    const iconPath = 'assets/favicon';
    const appName  = 'Alla Romasheva Design';
    const appShortName = 'Romasheva Design'
    const url = 'https://romasheva.design/';
    const filePath = url.concat(iconPath);
    return gulp.src(iconFile)
        .pipe(replace('currentColor',color))
        .pipe(favicons.stream({
            appName: appName,
            appShortName: appShortName,
            appDescription: "",
            background: color ,
            path: filePath,
            theme_color: color,
            appleStatusBarStyle: 'default',
            url: url,
            display: "standalone",
            orientation: "portrait",
            scope: "/",
            start_url: "/?homescreen=1",
            version: 1.0,
            replace: true,
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: false,
                coast: true,
                favicons: true,
                firefox: true,
                windows: true,
                yandex: false
            }
        },(html)=>{
            console.log(html.join('\n'));
        }))
        .pipe(gulp.dest(iconPath));
});

gulp.task('sprite', function(){
    return svgBundler('assets/icons/**/*.svg','sprite.svg','assets');
});

gulp.task('scss',function(){
    return scssBundler('assets/scss/*.scss','assets/css');
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
