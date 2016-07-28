module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/event_pulse_test',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    },
    useNullAsDefault: true
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost/event_pulse',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    },
    useNullAsDefault: true
  }
};
