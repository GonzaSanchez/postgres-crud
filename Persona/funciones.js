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

function InsertPersona(nombrePersona) {
  const results = [];

  pool.connect((err, client, done) => {
    if(err) {
      return console.error('errrrrror', err);
    }
    try {
      client.query('INSERT INTO public."PERSONA"(NOMBRE_PERSONA) VALUES($1)',[nombrePersona]);
      const query = client.query('SELECT * FROM public."PERSONA"');
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
    } catch (e) {
      console.log(e);
    }

  })

  pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack);
  });
}

function SelectPersonas(callback) {
  var arrIds = [];

  pool.connect((err, client, done) => {
    if(err) {
      return console.error('errrrrror', err);
    }

    client.query('SELECT * FROM public."PERSONA" ORDER BY ID_PERSONA', (err, result) => {
      done();

      if(err) {
        return console.error('errror', err);
      }
      for(var i = 0; i < result.rows.length; i++)
      {
        arrIds.push(result.rows[i].id_persona);
      }

      if(typeof callback === 'function')
        callback(result.rows);
    });
  });

  pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack);
  });
}

function ModificarPersona(nombrePersona, idPersona, callback) {
  pool.connect((err, client, done) => {
    if(err)
      return console.log('error: ' + err);

      client.query('UPDATE public."PERSONA" SET NOMBRE_PERSONA = $1 WHERE ID_PERSONA = $2', [nombrePersona, idPersona], () => {
        if(typeof callback === 'function')
          callback();
      });


  });

  pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack);
  });
}

function EliminarPersona(idPersona, callback){
  pool.connect((err, client, done) => {
    if(err)
      return console.log('error: '+ err);

      client.query('DELETE FROM public."PERSONA" WHERE ID_PERSONA = $1', [idPersona], () => {
        if(typeof callback === 'function')
          callback();
      })
  });

  pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack);
  });
}



module.exports = {GetListaPersonas: SelectPersonas, AgregarPersona: InsertPersona, ModificarPersona: ModificarPersona, EliminarPersona: EliminarPersona}
