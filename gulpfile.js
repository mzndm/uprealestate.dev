'use strict';

var gulp 		= require('gulp'),
    sass 		= require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    prefixer    = require('gulp-autoprefixer'),
    cache       = require('gulp-cache'),
    del         = require('del'),
    rigger      = require('gulp-rigger'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    fontAwesome = require('node-font-awesome'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

var path = {
    build: {
        html:   'build/',
        js:     'build/js/',
        lib_js: 'build/js/libs/',
        style:  'build/css/',
        img:    'build/img/',
        fonts:  'build/fonts/'
    },
    src: {
        html:   'src/*.html',
        js:     'src/js/*.js',
        style:  'src/scss/main.scss',
        img:    'src/img/**/*.*',
        fonts:  'src/fonts/**/*.*'
    },
    watch: {
        html:   'src/**/*.html',
        js:     'src/js/*.js',
        lib_js: 'src/js/libs/libs.js',
        style:  'src/scss/*.scss',
        img:    'src/img/**/*.*',
        fonts:  'src/fonts/**/*.*'
    },
    lib: {
        js:     [ 'src/js/libs/libs.js' ]
    },
    clean: 'build/'

};

var config = {
    bowerDir: 'bower',
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
               config.bowerDir + '/bootstrap-sass/assets/stylesheets/',
               'fontAwesome.scssPath'
            ],
            // outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        // .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('lib_js:build', function () {
    gulp.src(path.lib.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.lib_js))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('fontAwesome:build', function () {
   gulp.src(fontAwesome.fonts)
       .pipe(gulp.dest(path.build.fonts + 'font-awesome'));
});

gulp.task('build', [
    'html:build',
    'fonts:build',
    'fontAwesome:build',
    'style:build',
    'lib_js:build',
    'js:build',
    'image:build'
]);

gulp.task('clean', function () {
    return del(path.clean, {force: true});
});

gulp.task('cache', function () {
    return cache.clearAll();
});

gulp.task('watch', function(){
    gulp.watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    gulp.watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    gulp.watch([path.watch.lib_js], function(event, cb) {
        gulp.start('lib_js:build');
    });
    gulp.watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    gulp.watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);