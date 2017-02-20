const promise = require('bluebird');
var options = {
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const dbConfig = require('../config.json');
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

var db = pgp(config);

function InsertPersonaPromise(nombrePersona)
{
    return new Promise((resolve, reject) => {
      db.any('INSERT INTO public."PERSONA"(NOMBRE_PERSONA) VALUES($1)', [nombrePersona])
          .then(function (data) {
              resolve();
          })
          .catch(function (error) {
              console.log("ERROR:", error.message); // print the error;
          })
          .finally(function () {
              pgp.end(); // for immediate app exit, closing the connection pool.
          });
    });
}

function GetListaPersonasPromise()
{
    return new Promise((resolve, reject) => {
      db.any('select * from public."PERSONA" ORDER BY id_persona')
          .then(function (data) {
              resolve(data);
          })
          .catch(function (error) {
              console.log("ERROR:", error.message); // print the error;
          })
          .finally(function () {
              pgp.end(); // for immediate app exit, closing the connection pool.
          });
    });
}

function UpdatePersonaPromise(nombrePersona, idPersona)
{
    return new Promise((resolve, reject) => {
      db.any('UPDATE public."PERSONA" SET NOMBRE_PERSONA = $1 WHERE ID_PERSONA = $2', [nombrePersona, idPersona], [nombrePersona, idPersona])
          .then(function () {
              resolve();
          })
          .catch(function (error) {
              console.log("ERROR:", error.message); // print the error;
          })
          .finally(function () {
              pgp.end(); // for immediate app exit, closing the connection pool.
          });
    });
}

function DeletePersonaPromise(idPersona)
{
    return new Promise((resolve, reject) => {
      db.any('DELETE FROM public."PERSONA" WHERE ID_PERSONA = $1', [idPersona])
          .then(function () {
              resolve();
          })
          .catch(function (error) {
              console.log("ERROR:", error.message); // print the error;
          })
          .finally(function () {
              pgp.end(); // for immediate app exit, closing the connection pool.
          });
    });
}


module.exports = {GetListaPersonasPromise: GetListaPersonasPromise, InsertPersonaPromise: InsertPersonaPromise, UpdatePersonaPromise: UpdatePersonaPromise, DeletePersonaPromise: DeletePersonaPromise}
