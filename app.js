var express = require('express'),
    router = express.Router(),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var select = require('./Persona/funciones');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/lista-personas', (req, res) => {
  select.GetListaPersonas((listaNombres) => {
    var tdNombres = '';
    console.log(listaNombres[0].nombre_persona);
    for(var i = 0; i < listaNombres.length; i++)
    {
        tdNombres += '<tr><td>' + listaNombres[i].nombre_persona + '</td></tr>';
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
                      </form>`;

    res.send(formulario);
});

router.post('/agregar', (req, res, next) => {
  var nuevoNombre = req.body.txtNombre;
  select.AgregarPersona(nuevoNombre);

  res.send('<h1>asda</h1>')
});

app.use(router);

app.listen(3000, () => {
  console.log('Node server running at 3000');
})
