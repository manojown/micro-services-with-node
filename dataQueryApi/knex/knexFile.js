module.exports = {
    development: {
      client: 'pg',
      connection: 
      {
        host:'db',
        database: 'employee',
        user:     'manoj',
        password: 'manoj'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  };

  //'db://manoj:manoj@localhost:5432/employee',