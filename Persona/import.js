var select = require('./funciones');


//var miFunc = select.selectPersonas.SelectPersonas;
select.GetListaPersonas(function(listaIds){
  MostrarIds(listaIds)
});

/*select.AgregarPersona('GONZALO');*/


function MostrarIds(listaIds){

  console.log(listaIds);
}
