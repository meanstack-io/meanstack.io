'use strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    compression = require('compression'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    store = new session.MemoryStore(),
    middleware = require('app/http/middleware'),
    routes = require('app/http/routes'),
    settings = require('config'),
    hbs = require('express-hbs'),
    hbsEngine = hbs.express4(
        {
            extname: ".hbs",
            layoutsDir: path.join(__dirname, 'resources/views/layouts/'),
            partialsDir: path.join(__dirname, 'resources/views/partials/')
        }
    ),
    hbsHelpers = require('app/helpers');

app.engine('hbs', hbsEngine);
app.set('view engine', 'hbs');
hbsHelpers();
app.use(compression());
app.set('views', path.join(__dirname, 'resources/views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session(
        {
            secret: settings.session.secret,
            resave: false,
            saveUninitialized: false,
            store: store,
            cookie: {
                httpOnly: true,
                maxAge: (typeof settings.cookie.maxAge !== 'undefined')? settings.cookie.maxAge : 2419200000
            }
        }
    )
);

/**
 * Init Middleware.
 */
middleware(app);


/**
 * Initialize Routes.
 */
routes(app);

/**
 * Error handler.
 */
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    var msgError = '<h1>' + err.message + '</h1>';
    msgError += (app.get('env') === 'development') ? '<p>' + (err.status || 500) + '</p><p>' + err.stack + '</p>' : '';
    res.send(msgError);
});

module.exports = app;
