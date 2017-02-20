var select = require('./funciones');


//var miFunc = select.selectPersonas.SelectPersonas;
/*select.GetListaPersonas( function(listaIds){
  MostrarIds(listaIds)
});*/

select.InsertPersona( function(listaIds){
  MostrarIds(listaIds)
});


function MostrarIds(listaIds){

  console.log(listaIds);
}
