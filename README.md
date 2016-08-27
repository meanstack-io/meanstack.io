# MEANStack.io
*bringing together the best of MEAN MongoDB, Express, AngularJS and Node.js*

Is a solution full-stack JavaScript, develop on MongoDB, Express, AngularJS, Node.js and another stack of packages.

MEANStack is a web application framework with strategy geared to facilitate development.

## Prerequisites
Node.js, MongoDB, Gulp, Bower, Nodemon and MEANStack-Client.

### Install Node.js
Installing Node.js via package manager access <a href="https://nodejs.org/en/download/package-manager/">https://nodejs.org/en/download/package-manager/</a>

### Install MongoDB
Installing MongoDB access <a href="https://docs.mongodb.org/manual/installation/">https://docs.mongodb.org/manual/installation/</a>

### Update NPM
Before we installed the Gulp, Bower and Nodemon we recommend updating the NPM.
```
$ npm update -g npm
```

### Install Gulp
```
$ npm install -g gulp
```

### Install Bower
```
$ npm install -g bower
```

### Install Nodemon
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.
```
$ npm install -g nodemon
```

### Install MEANStack-Client
```
$ npm install -g meanstack-cli
```

## Getting Started
Two steps up its application.

###Create your application
```
$ meanstack new <path_app>
```
Will be cloned the repository "https://github.com/meanstack-io/meanstack.io" after will run "npm install", "bower install", "cp .env.example.js .env.js" and "gulp". 


### Listening server
Serve the application.
```
$ meanstack serve
```

### Configuration
All the MEANStack framework configuration is in the "config" directory.

#### Accessing Configuration Values
```js
$value = require('meanstack').config.get('mail').smtp;
```
Where "mail" is the configuration file and "stmp" the object.

### Environment Configuration
By default the installation of your application is copied the file "env.example.js" and pasted with the name "env.js".

Your path can be configured in "config/app.js" => env.

### Database
By default the connection provider with MongoDB is disabled by not being configured the connection.

#### Configure
Edit the file "env.js" stating the details of your connection.

#### Enable provider
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
## Documentation
Documentation can be found on the [MEANStack.io](http://meanstack.io)

## Repositories

MEANStack.io (Starter) - https://github.com/meanstack-io/meanstack.io

MEANStack (Kernel) - https://github.com/meanstack-io/meanstack

MEANStack-Client (Client) - https://github.com/meanstack-io/meanstack-cli

## Copyright & License

Copyright © 2016 MEANStack.io - Licensed under [MIT](https://github.com/meanstack-io/meanstack.io/blob/master/License).
