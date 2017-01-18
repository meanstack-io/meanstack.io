/**
 * Config Gulp tasks
 *
 */

'use strict';

var resolve = require('path').resolve,
    path = {
        dist: resolve(__dirname, '../..', 'public'),
        src: __dirname,
        bower: resolve(__dirname, 'bower'),
        angular: resolve(__dirname, 'javascripts/angular'),
        meanstack: resolve(__dirname, '../..', 'node_modules/meanstack')
    };

var assets = {
    /*
     |--------------------------------------------------------------------------
     | Task Fonts
     |--------------------------------------------------------------------------
     | Copy fonts of bootstrap and assets/fonts/
     |
     */
    fonts: {
        src: [
            path.bower + '/bootstrap-sass/assets/fonts/bootstrap/*.{otf,eot,svg,ttf,woff,woff2}',
            path.src + '/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}'
        ],
        dist: path.dist + '/fonts/'
    },

    /*
     |--------------------------------------------------------------------------
     | Task Images
     |--------------------------------------------------------------------------
     | Optimize images.
     |
     */
    images: {
        src: [
            path.src + '/images/**.{png,jpg,jpeg,ico}'
        ],
        dist: path.dist + '/images/'
    },

    /*
     |--------------------------------------------------------------------------
     | Task style
     |--------------------------------------------------------------------------
     | Compile SASS and CSS.
     | Concatenating in a single file.
     |
     */
    style: {
        src: [
            path.src + '/stylesheets/sass/main.scss'
        ],
        dist: path.dist + '/stylesheets/',
        options: {
            concat: true,
            sourcemaps: {
                write: {
                    dir: './maps'
                }
            }
        }
    },

    /*
     |--------------------------------------------------------------------------
     | Task dependencies
     |--------------------------------------------------------------------------
     | All dependencies of application.
     | Concatenating in a single file.
     |
     */
    dependencies: {
        src: [
            path.bower + '/jquery/dist/jquery.js',
            path.bower + '/bootstrap-sass/assets/javascripts/bootstrap.js',
            path.bower + '/angular/angular.js',
            path.bower + '/angular-ui-router/release/angular-ui-router.js',
            path.bower + '/oclazyload/dist/ocLazyLoad.js',

            // MEANStack Modules angularjs
            path.meanstack + '/lib/angular/modules/path.js',
            path.meanstack + '/lib/angular/modules/route.js'

            // Application
            //
        ],
        dist: path.dist + '/javascripts/',
        options: {
            jshint: false,
            concat: true,
            name: 'dependencies.js',
            sourcemaps: {
                write: {
                    dir: './maps'
                }
            }
        }
    },

    /*
     |--------------------------------------------------------------------------
     | Task angular
     |--------------------------------------------------------------------------
     | Application AngularJS.
     | Valid JavaScript with JSHint.
     | Concatenating in a single file.
     |
     */
    angular: {
        src: [
            path.angular + '/app.js',
            path.angular + '/config.js',
            path.angular + '/providers/**/*.js',
            path.angular + '/factory/**/*.js',
            path.angular + '/services/**/*.js',
            path.angular + '/directives/**/*.js',
            path.angular + '/routes/**/*.js',
            path.angular + '/run.js',
            path.angular + '/controllers/app/**/*.js'
        ],
        dist: path.dist + '/javascripts/',
        options: {
            jshint: true,
            concat: true,
            name: 'angular.js',
            sourcemaps: {
                write: {
                    dir: './maps'
                }
            }
        }
    },

    /*
     |--------------------------------------------------------------------------
     | Task controllers
     |--------------------------------------------------------------------------
     | With the strategy of Lazy Load the Controllers are inserted in application only when necessary.
     | Valid JavaScript with JSHint.
     |
     */
    controllers: {
        src: [
            path.angular + '/controllers/partials/**/*.js'
        ],
        dist: path.dist + '/javascripts/controllers/',
        options: {
            jshint: true,
            concat: false,
            sourcemaps: {
                write: {
                    dir: './maps'
                }
            }
        }
    },

    /*
     |--------------------------------------------------------------------------
     | Task clean
     |--------------------------------------------------------------------------
     | Clean directory dist.
     |
     */
    clean: path.dist,

    /*
     |--------------------------------------------------------------------------
     | Task watch
     |--------------------------------------------------------------------------
     | Watch directories, if someone files change is recompiled the task.
     |
     */
    watch: [
        {
            src: path.src + '/stylesheets/**',
            task: ['style', 'bs-reload']
        },
        {
            src: path.src + '/javascripts/**',
            task: ['angular', 'controllers', 'bs-reload']
        },
        {
            src: './resources/views/**',
            task: ['bs-reload']
        }
    ],

    /*
     |--------------------------------------------------------------------------
     | Config browserSync
     |--------------------------------------------------------------------------
     | BrowserSync used on task watch.
     |
     */
    browserSync: {
        proxy: "http://localhost:8000"
    }
};

module.exports = assets;
