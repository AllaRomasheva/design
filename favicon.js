var realfavicon = require ('gulp-real-favicon');
var svg64 = require('svg64');
var fs = require('fs');


var getJsonResult = function(file){
    var result   = fs.readFileSync(file).toString();
    var json     = JSON.parse(result);
    return json;
}


module.exports = function(params,callback){
    var dest   = params.dest;
    var file   = params.file;
    var name   = params.name || 'My App';
    var color  = params.color;
    var path   = params.path;
    var markup = dest.concat('/result.json');
    var icon   = fs.readFileSync(file).toString();
        icon = icon.replace('currentColor',color);

    realfavicon.generateFavicon({
        masterPicture: file,
        dest: dest,
        iconsPath: path,
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {
                design: 'raw'
            },
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: color,
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'shadow',
                themeColor: color,
                manifest: {
                    name: name ,
                    startUrl: '/',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 67.1875,
                themeColor: params.color
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
            readmeFile: false,
            htmlCodeFile: false,
            usePathAsIs: false
        },
        markupFile: markup
    }, function() {
        var result = getJsonResult(markup);
        if(params.target && result.favicon){
            fs.writeFileSync(params.target,result.favicon.html_code);
        }
        callback();
    });

};
