module.exports =
    settings = {
        name: 'MEANStack',
        version: '0.0.1',
        dbconnect: {
            host: 'localhost',
            port: '27017',
            user: 'meanstack',
            password: 'meanstack',
            base: 'meanstack'
        },
        env: 'dev',
        session: {
            secret: 'MEANStack'
        },
        cookie: {
            flagAngularLogged: 'login'
        }
    };