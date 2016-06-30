# MEANStack.io
*bringing together the best of MEAN MongoDB, Express, AngularJS and Node.js*

Is a solution full-stack JavaScript, based on MongoDB, Express, AngularJS, Node.js and another stack of packages.

* Stack of packages
 * Gulp gulp-sass, gulp-minify-css, gulp-imagemin, gulp-uglify, gulp-jshint, browser-sync and more...
 * Bower package manager. Used to manage front-end packages.
 * Handlebars template manager.
 * Mongoose MongoDB object modeling tool.
 * Nodemailer module to send e-mails with Node.js.
 * Passporte authentication middleware for Node.js. With passport-facebook, passport-github, passport-google-oauth, passport-linkedin-oauth2, passport-twitter and passport-local form to login strategy.
 * jQuery JavaScript Library.
 * AngularUI Router Routing framework for AngularJS.
 * ocLazyLoad Lazy load modules & components in AngularJS.
 * Bootstrap for Sass is Bootstrap...

Are some of the packages that we use to make this dream come true.

## Prerequisites
Install Node.js e MongoDB.

### Install Node.js
Installing Node.js via package manager access <a href="https://nodejs.org/en/download/package-manager/">https://nodejs.org/en/download/package-manager/</a>

#### Notes
if you use Debian and Ubuntu based Linux distributions be sure to install **build-essential**.
```bash
$ sudo apt-get install -y build-essential
```

if you use Enterprise Linux and Fedora be sure to install **gcc-c++ make**.
```bash
$ yum install gcc-c++ make
```

### Install MongoDB
Installing MongoDB access <a href="https://docs.mongodb.org/manual/installation/">https://docs.mongodb.org/manual/installation/</a>

#### Note
If you've never worked with a MongoDB read in your documentation before you install it, official documentation access, <a href="https://docs.mongodb.org/manual/">https://docs.mongodb.org/manual/</a>

## Installation

Before you begin installing MEANStack we will update the NPM and soon after installing Gulp, Bower and nodemon in the global scope.

### Updating NPM
```bash
$ npm update -g npm
```

### Install Gulp
```bash
$ npm install -g gulp
```

### Install Bower
```bash
$ npm install -g bower
```

### Install Nodemon
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development. Install it using npm.
```bash
$ npm install -g nodemon
```

#### Note
If you already have the Gulp and Bower recommend updates them.
```bash
$ npm update -g gulp bower
```

### The first step
Clone the repository GitHub.
```bash
$ git clone git@github.com:meanstack-io/meanstack.io.git
```

### The second step
Install the back-end dependencies.
```bash
$ npm install
```

### The third step
Install the front-end dependencies.
```bash
$ bower install
```

### The fourth step
Configure the application. For this we have a sample file "config/config.example.js" copy and rename it to "config/config-development.js". 
```bash
$ cp config/config.example.js config/config-development.js
```

#### Configuration file.
The file "config/config-development.js" represents the configuration of your environment. What ? within package.json we have:
```js
"start": "NODE_ENV=development nodemon ./bin/www"
```
The "NODE_ENV" property sets which environment setting will be used. Example:
```js
"start": "NODE_ENV=production nodemon ./bin/www" // Its configuration file is "config/config-production.js".
```

### The fifth step
Run Gulp.
```bash
$ gulp
```

### The sixth step
Start the application.
```bash
$ npm start 
```

If you want to use the Gulp with Browsersync
```bash
$ gulp watch
```

## Documentation
Documentation can be found on the [meanstack.io](http://meanstack.io/documentation)

## Copyright & License

Copyright © 2016 MEANStack.io - Licensed under [MIT](https://github.com/meanstack-io/meanstack.io/blob/master/License).
