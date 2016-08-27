var config = {
    'app': {
        'hostname': 'localhost',
        'port': '8000',
        'url': 'http://localhost:8000/'
    },

    'database': {
        'host': 'localhost',
        'port': '27017',
        'user': '####',
        'password': '####',
        'base': '####'
    },

    'session': {
        'secret': '########'
    },

    'mail': {
        'smtp': {
            'host': 'smtp.gmail.com',
            'secure': true,
            'port': '465',
            'auth': {
                'user': '##########@gmail.com',
                'pass': '##########'
            },
            'logger': true,
            'debug': true
        }
    }
};

module.exports = config;
