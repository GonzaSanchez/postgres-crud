var apiPersona = require('./funciones-promise');


//var miFunc = select.selectPersonas.SelectPersonas;
/*select.GetListaPersonas(function(listaIds){
  MostrarIds(listaIds)
});*/

/*select.AgregarPersona('GONZALO');*/


apiPersona.DeletePersonaPromise(8).then(() => {
  apiPersona.GetListaPersonasPromise().then((data) => {
    console.log(data);
  });
})
