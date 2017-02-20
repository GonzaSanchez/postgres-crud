var express = require('express'),
    router = express.Router(),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var select = require('./Persona/funciones');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

router.get('/lista-personas', (req, res) => {
  select.GetListaPersonas((listaNombres) => {
    var tdNombres = '';
    //console.log(listaNombres);
    for(var i = 0; i < listaNombres.length; i++)
    {
        tdNombres += `<tr><td>` + listaNombres[i].nombre_persona + `</td><tr>`;
    }
    var table = `<table>
                    <thead>
                      <th>Nombre Persona</th>
                    </thead>
                    <tbody>
                      ` + tdNombres + `
                    </tbody>
                  </table>`
    res.send(table);
  });
});

router.get('/agregar-persona', (req, res) => {
    var formulario = `<form method="post" action="/agregar">
                        <label>Nombre</label>
                        <input type="text" name="txtNombre" />
                        <button>Agregar</button>
                      </form>
                      <script
                      src="https://code.jquery.com/jquery-3.1.1.min.js"
                      integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
                      crossorigin="anonymous"></script>`;

    res.send(formulario);
});

router.post('/agregar', (req, res, next) => {
  var nuevoNombre = req.body.txtNombre;
  select.AgregarPersona(nuevoNombre);

  res.redirect('/lista-personas');
});

router.get('/modificar-persona', (req, res, next) => {
  select.GetListaPersonas((listaNombres) => {
    var tdNombres = '';
    //console.log(listaNombres);
    for(var i = 0; i < listaNombres.length; i++)
    {
        tdNombres += `<tr>
                        <form method="post" action="/modificar">
                          <td><input type="text" name="txtPersona" value="` + listaNombres[i].nombre_persona + `" /></td>
                          <input type="hidden" name="hdnIdPersona" value="` + listaNombres[i].id_persona + `" />
                          <td><button type="submit">Modificar</button></td>
                        </form>
                      <tr>`;
    }
    var table = `<table>
                     <thead>
                        <th>Nombre Persona</th>
                        <th></th>
                     </thead>
                     <tbody>
                      ` + tdNombres + `
                     </tbody>
                 </table>`

    res.send(table);
  });
});

router.post('/modificar', (req, res, next) => {
  var nuevoNombre = req.body.txtPersona;
  var idPersona = req.body.hdnIdPersona;

  select.ModificarPersona(nuevoNombre, idPersona, () => {
    res.redirect('/lista-personas');
  })
})

router.get('/eliminar-persona', (req, res, next) => {
  select.GetListaPersonas((listaNombres) => {
    var tdNombres = '';
    //console.log(listaNombres);
    for(var i = 0; i < listaNombres.length; i++)
    {
        tdNombres += `<tr>
                        <form method="post" action="/eliminar">
                          <td><input type="text" name="txtPersona" value="` + listaNombres[i].nombre_persona + `" /></td>
                          <input type="hidden" name="hdnIdPersona" value="` + listaNombres[i].id_persona + `" />
                          <td><button type="submit">Eliminar</button></td>
                        </form>
                      <tr>`;
    }
    var table = `<table>
                     <thead>
                        <th>Nombre Persona</th>
                        <th></th>
                     </thead>
                     <tbody>
                      ` + tdNombres + `
                     </tbody>
                 </table>`

    res.send(table);
  });
});

router.post('/eliminar', (req, res, next) => {
  var nuevoNombre = req.body.txtPersona;
  var idPersona = req.body.hdnIdPersona;

  select.EliminarPersona(idPersona, () => {
    res.redirect('/lista-personas');
  })
});

app.use(router);

app.listen(3000, () => {
  console.log('Node server running at 3000');
})
