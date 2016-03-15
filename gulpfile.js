'use strict';

/**
 * Gulpfile
 *
 * gulp --option:
 *   gulp or gulp watch create files min also not min.
 *   gulp --production creta only files min
 */
var argv = require('minimist')(process.argv.slice(2)),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    minimatch = require("minimatch"),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    path = {
        bower: __dirname + '/bower_components/',
        dist: __dirname + '/public/dist/',
        src: __dirname + '/public/src/',
        angular: __dirname + '/public/src/javascripts/angular/'
    },
    files = {
        js: [
            path.bower + 'jquery/dist/jquery.js',
            path.bower + 'angular/angular.js',
            path.bower + 'angular-resource/angular-resource.js',
            path.bower + 'angular-ui-router/release/angular-ui-router.js',
            path.bower + 'oclazyload/dist/ocLazyLoad.js',
            path.bower + 'angular-animate/angular-animate.js',
            path.bower + 'bootstrap-sass/assets/javascripts/bootstrap.js',
            path.bower + 'AngularJS-Toaster/toaster.js',
            //develop files
            path.angular + '/modules/*.js',
            path.angular + 'app.js',
            path.angular + 'config.js',
            path.angular + 'configs/*.js',
            path.angular + 'factory/*.js',
            path.angular + 'services/*.js',
            path.angular + 'directives/*.js',
            path.angular + 'routers.js',
            path.angular + 'run.js',
            path.angular + 'controllers/app/*.js'
        ],
        js_modules: [
            path.angular + 'controllers/modules/*.js',
            path.angular + 'controllers/modules/login/*.js'
        ],
        css: [
            path.bower + 'AngularJS-Toaster/toaster.scss',
            path.src + 'stylesheets/sass/main.scss',
            path.src + 'stylesheets/styles/*.{scss,css}'
        ],
        fonts: [
            path.bower + 'bootstrap-sass/assets/fonts/bootstrap/*.{eot,svg,ttf,woff,woff2}',
            path.src + 'fonts/*.{eot,svg,ttf,woff,woff2}'
        ],
        images: [
            path.src + 'images/*.{png,jpg,jpeg}'
        ]
    },
    /**
     * Ignore files bower
     * Used - Not validation in jshint
     * @param file
     * @returns {boolean}
     */
    notIsBower = function (file) {
        return !minimatch(file.path, path.bower + '**/*.js');
    },
    /**
     * Ignore files js_modules
     * Used - Not concat with main script
     * @param file
     * @returns {boolean}
     */
    notIsModule = function (file) {
        if (typeof files.js_modules !== 'undefined' && Array.isArray(files.js_modules)) {
            for (var i = 0; i < (files.js_modules).length; i++) {
                if (minimatch(file.path, files.js_modules[i])) {
                    return false;
                }
            }
        }
        return true;
    };

/**
 * Compress Images
 */
gulp.task('images', function () {
    gulp.src(files.images)
        .pipe(cache(
            imagemin(
                {
                    optimizationLevel: 3,
                    progressive: true,
                    interlaced: true
                }
            )
        ))
        .pipe(gulp.dest(path.dist + 'images/'))
        .pipe(browserSync.reload({stream: true}))
});

/**
 * Compile SASS and compress CSS
 */
gulp.task('styles', function () {
    gulp.src(files.css)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(concat('main.css'))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulpif(!argv.production, gulp.dest(path.dist + 'stylesheets/')))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(path.dist + 'stylesheets/'))
        .pipe(browserSync.reload({stream: true}))
});

/**
 * Copy Fonts
 */
gulp.task('fonts', function () {
    return gulp.src(files.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(path.dist + 'fonts/'))
        .pipe(browserSync.stream());
});

/**
 * Compile scripts
 */
gulp.task('scripts', function () {
    return gulp.src((files.js).concat(files.js_modules))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulpif(notIsBower, jshint()))
        .pipe(jshint.reporter('default'))
        .pipe(gulpif(notIsModule, concat('main.js')))
        .pipe(gulpif(!argv.production, gulp.dest(path.dist + 'javascripts/')))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist + 'javascripts/'))
        .pipe(browserSync.reload({stream: true}));
});

/**
 * Clear directory
 */
gulp.task('clean',
    require('del').bind(null, path.dist)
);

/**
 * Build sequence
 */
gulp.task('build', function (callback) {
    runSequence(
        'scripts',
        'styles',
        ['fonts', 'images'],
        callback);
});

/**
 * Start Gulp
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

/**
 * Reload Gulp
 */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/**
 * Gulp Watch
 */
gulp.task('watch', ['default'], function () {
    browserSync.init({
        proxy: "localhost:8080"
    });
    gulp.watch("public/src/stylesheets/**/*.scss", ['styles']);
    gulp.watch("public/src/javascripts/**/*.js", ['scripts']);
    gulp.watch("public/src/images/**/*", ['images']);
    gulp.watch("public/src/fonts/*", ['fonts']);
    gulp.watch("*.hbs", ['bs-reload']);
});