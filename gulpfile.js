'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    rimraf = require('rimraf'),
    watch = require('gulp-watch'),
    importCss = require('gulp-import-css'),
    reload = browserSync.reload;

var path = {
    app: {
        html: 'app/',
        js: 'app/js/',
        css: 'app/css/',
        img: 'app/img/',
        fonts: 'app/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './app'
};

var config = {
    server: {
        baseDir: './app'
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: 'Frontend_Tony'
};

//HTML
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.app.html))
        .pipe(reload({stream: true}));
});

//JS
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.app.js))
        .pipe(reload({stream: true}));
});

//CSS
gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(importCss())
        // .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.app.css))
        .pipe(reload({stream: true}));
});

//IMG
gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.app.img))
        .pipe(reload({stream: true}));
});

//FONTS
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.app.fonts))
});

gulp.task('build', ['html:build', 'js:build', 'style:build', 'fonts:build', 'img:build']);


//WATCH
gulp.task('watch', function () {
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.image, ['img:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);

});


//WEB SERVER
gulp.task('webserver', function() {
   browserSync(config);
});

//CLEAN
gulp.task('clear', function (cb) {
    rimraf(path.clean, cb);
});

//DEFAULT
gulp.task('default', ['build', 'webserver', 'watch']);