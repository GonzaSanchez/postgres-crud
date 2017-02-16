const pg = require('pg');
const dbConfig = require('../config.json')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/public';

const config = {
  user: dbConfig.user, //env var: PGUSER
  database: 'Test', //env var: PGDATABASE
  password: dbConfig.pass, //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

function SelectPersonas(callback) {
  var arrIds = [];

  pool.connect((err, client, done) => {
    if(err) {
      return console.error('errrrrror', err);
    }

    client.query('SELECT * FROM public."PERSONA"', (err, result) => {
      done();

      if(err) {
        return console.error('errror', err);
      }
      for(var i = 0; i < result.rows.length; i++)
      {
        arrIds.push(result.rows[i].id_persona);
      }

      if(typeof callback === 'function')
      {
        callback(arrIds);
      }
      else
      {
        console.log('nkfnkvnkf');
      }
    });
  });

  pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack);
  });
}

module.exports = {
    func: SelectPersonas
}
