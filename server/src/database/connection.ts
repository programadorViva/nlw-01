import knex from 'knex';
import path from 'path';


const connection = require('knex')({
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: path.resolve(__dirname, 'database.sqlite')
    },
    pool: {
      min: 0,
      max: 6000000,
    },
    useNullAsDefault: true,    
});

  export default connection;