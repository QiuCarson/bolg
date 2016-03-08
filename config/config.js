var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'test2'
    },
    port: 3000,
    db: 'mongodb://localhost/test1-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'test2'
    },
    port: 3000,
    db: 'mongodb://localhost/test2-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'test2'
    },
    port: 3000,
    db: 'mongodb://localhost/test2-production'
  }
};

module.exports = config[env];
