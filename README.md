# MEANStack.io
*bringing together the best of MEAN MongoDB, Express, AngularJS and Node.js*

[![Build Status](https://travis-ci.org/meanstack-io/meanstack.svg)](https://travis-ci.org/meanstack-io/meanstack)
[![Coverage Status](https://coveralls.io/repos/github/meanstack-io/meanstack/badge.svg)](https://coveralls.io/github/meanstack-io/meanstack)
[![npm](https://img.shields.io/npm/v/meanstack.svg)](https://www.npmjs.com/package/meanstack)
[![npm](https://img.shields.io/npm/dm/meanstack.svg)](https://www.npmjs.com/package/meanstack)
[![npm](https://img.shields.io/npm/l/meanstack.svg)](https://www.npmjs.com/package/meanstack)

MEANStack.io is a web application framework with strategy geared to facilitate development.

Is a solution full-stack JavaScript, develop on MongoDB, Express, AngularJS, Node.js and another stack of packages.

## Install, it's easy...
* Update Npm and **Install** Gulp, Bower, Nodemon and MEANStack CLI.
```
$ npm update -g npm && npm install -g gulp bower nodemon meanstack-cli
```

* **Create** your application.
```
$ meanstack new <path_app>
```

* **Start** your application.
```
$ cd <path_app> && meanstack serve
```

## Database
By default the connection provider with MongoDB is disabled by not being configured the connection.

### Configure
Edit the file "env.js" stating the details of your connection.

### Enable provider
Edit the file "config/app.js" => providers, uncomment the line 'meanstack/lib/database/DatabaseServiceProvider'.

Result
```js
'providers': [
    ...
    'meanstack/lib/bodyParser/BodyParserServiceProvider',
    'meanstack/lib/cookieParser/CookieParserServiceProvider',
    'meanstack/lib/database/DatabaseServiceProvider', // <= Uncomment.
    'meanstack/lib/response/ResponseServiceProvider',
    ...
]
```

## Common installation errors
Some common errors already solved. An error has occurred in the installation? Please let us know.
https://github.com/meanstack-io/meanstack.io/wiki/Common-installation-errors


## Documentation
Documentation can be found on the [MEANStack.io](http://meanstack.io/docs/)

## Repositories

MEANStack.io (Starter) - https://github.com/meanstack-io/meanstack.io

MEANStack (Kernel) - https://github.com/meanstack-io/meanstack

MEANStack-Client (Client) - https://github.com/meanstack-io/meanstack-cli

## Copyright & License

Copyright © 2016 MEANStack.io - Licensed under [MIT](https://github.com/meanstack-io/meanstack.io/blob/master/License).
