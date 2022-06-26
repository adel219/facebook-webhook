const knex = require('knex');

const database = knex({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : process.env.DB_PASSWORD,
      database : 'inventory'
    }
  });

exports.database = database;