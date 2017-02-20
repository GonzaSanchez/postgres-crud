var express = require('express'),
    router = express.Router(),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var apiPersona = require('./Persona/funciones-promise');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

router.get('/lista-personas', (req, res) => {
  apiPersona.GetListaPersonasPromise().then((data) => {
    res.json(data);
  });
});

router.post('/agregar', (req, res, next) => {
  var nuevoNombre = req.body.nombre;
  apiPersona.InsertPersonaPromise(nuevoNombre)
  .then(() => {
    apiPersona.GetListaPersonasPromise().then((data) => {
      res.json(data);
    });
  });
});

router.post('/modificar', (req, res, next) => {
  var nuevoNombre = req.body.nombre;
  var idPersona = req.body.id;

  apiPersona.UpdatePersonaPromise(nuevoNombre, idPersona)
  .then(() => {
    apiPersona.GetListaPersonasPromise().then((data) => {
      res.json(data);
    });
  })
})

router.post('/eliminar', (req, res, next) => {
  var idPersona = req.body.id;

  apiPersona.DeletePersonaPromise(idPersona)
  .then(() => {
    apiPersona.GetListaPersonasPromise().then((data) => {
      res.json(data);
    });
  });
});

app.use(router);

app.listen(3000, () => {
  console.log('Node server running at 3000');
})
