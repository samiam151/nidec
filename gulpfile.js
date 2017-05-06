var gulp = require('gulp');
var browsersync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('build-css', function(){
    log('Building CSS...');
    return gulp.src('./styles/styles.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./styles/'));
});

gulp.task('browsersync', function(){
    startBrowserSync();
});

gulp.task('watch', ['build-css'], function(){
    log("Re-building css...")
    gulp.watch('./styles/*.scss', ['build-css']);
});

gulp.task('default', ['watch', 'browsersync']);

// UTILITY FUNCITONS
function log(msg){
    if (typeof(msg) === 'object'){
        for(var item in msg){
            if(msg.hasOwnProperty(item)){
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function startBrowserSync(){
    if(browsersync.active){
        return;
    }
    log("Syncing browsers...");

    var options = {
        proxy: 'localhost:9000/nidec',
        port: 4000,
        files: ['**/*.*', "!.gitignore"],
        ghostMode: {
            click: true,
            scroll: true,
            location: false,
            forms: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    browsersync(options);
}