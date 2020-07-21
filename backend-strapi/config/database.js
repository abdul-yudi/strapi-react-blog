module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', 'cluster0-shard-00-00.du1bk.mongodb.net?replicaSet=atlas-jc3eoy-shard-0&authSource=admin&retryWrites=true'),
        srv: env.bool('DATABASE_SRV', false),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'Map'),
        username: env('DATABASE_USERNAME', 'wibiez'),
        password: env('DATABASE_PASSWORD', '123Awesome'),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', true),
      },
    },
  },
});
