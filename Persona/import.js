var select = require('./funciones-promise');


//var miFunc = select.selectPersonas.SelectPersonas;
/*select.GetListaPersonas(function(listaIds){
  MostrarIds(listaIds)
});*/

/*select.AgregarPersona('GONZALO');*/



select.DeletePersonaPromise(8).then(() => {
  select.GetListaPersonasPromise().then((data) => {
    console.log(data);
  });
})
