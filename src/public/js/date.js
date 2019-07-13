
function create(){
  var fecha = new Date()
  //document.getElementById('texto').innerHTML  =   fecha.getFullYear().toString() + fecha.getMonth().toString() + fecha.getDate().toString() + fecha.getHours().toString() + fecha.getMinutes().toString() + fecha.getSeconds().toString()
  var a = document.getElementById("datepicker").value;
  console.log(a);
  var parsefecha = Date.parse(a)
  var fecha = new Date(parsefecha)
  console.log(fecha);
  var dia = fecha.getDate()
  var mes = fecha.getMonth()
  var annio = fecha.getFullYear()
  var patron = String(annio)+String(mes )+String(dia)
  document.getElementById("texto").innerHTML = patron ;
  console.log(patron);
  var requisito = {solicitud:patron}
  console.log(requisito);

  var url = "https://us-central1-azzheztiaoms.cloudfunctions.net/obtenerEncabezado";
  fetch(url,{
    method: "POST",
    cache:"no-cache",
    headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin":"*"
          },
 body: JSON.stringify(requisito)
  }).then(function(response) {
       return response.json().then(function(response){
         return response
       }).catch(function(){
         console.log("sin respuesta");
         alert("sin respuesta")
       })
   }).then(function(respuesta){

     console.log(respuesta);
     var contenido = []
     var casos = []
     for( var i in respuesta){
       contenido.push([i, respuesta [i]]);
     }
     for( var i in contenido){
       casos.push(contenido [i][0]);
     }
     var casoss = []
     for(i = 0; i<casos.length; i++){
       var a = respuesta[casos[i]];
       var estatus
       if (a["completed"] === false){
         estatus = '<div class="btn-group" role="group">'+
           '<button type="button" class="btn btn-outline-success"disabled id ="yes'+casos[i]+'"><span class="fa fa-check" ></span></button>'+
           '<button type="button" class="btn btn-danger"disabled id ="no'+casos[i]+'"><span class="fa fa-times" > </span></button></div>'
       }
       else {
         estatus = '<div class="btn-group" role="group">'+
           '<button type="button" class="btn btn-success"disabled id ="yes'+casos[i]+'"><span class="fa fa-check" ></span></button>'+
           '<button type="button" class="btn btn-outline-danger"disabled id ="no'+casos[i]+'"><span class="fa fa-times" > </span></button></div>'
       }
       console.log(i);
        casoss.push({
         "orden":casos[i],
         "estatus":estatus,
         "direccion": a["calle"],
         "persona": a["persona"],
         "tipo": a["servicio"],
         "detalles":'<a onclick="LoadModalTable('+casos[i]+','+patron+')"><buttontype="button" class="btn btn-link-dark" ><span class="fa fa-folder-open"></span> </a>'

       })
       console.log(casoss);

     }

     var $table = $('#table')

       $table.bootstrapTable('refreshOptions',{data: casoss})
       console.log("finalizado");

   }).catch(function(error){

 });
 }
 function consultarReporte(folio, consulta) {

   var requisito = {
     solicitud:consulta,
     folio: folio
   }
   console.log(requisito);
   var url = "https://us-central1-azzheztiaoms.cloudfunctions.net/obtenerDetalles";
   fetch(url,{
     method: "POST",
     cache:"no-cache",
     headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin":"*"
           },
  body: JSON.stringify(requisito)
   }).then(function(response) {
        return response.json().then(function(response){
          return response
        }).catch(function(){
          console.log("sin respuesta");
          alert("sin respuesta")
        })
    }).then(function(respuesta){
      console.log(respuesta);
      var domicilio = respuesta["domicilio"]["domicilio"]
      var datos = []
      datos.push({
        calle: domicilio["0"],
        colonia: domicilio["1"],
        alcaldia: domicilio["2"],
        cp: domicilio["3"],
        referencias: domicilio["4"]
      })
      var fechas= []
      fechas.push({
        fecha: respuesta["datosrecibo"]["hora"],
        hora:respuesta["historial"]["fecha"],
        uid:respuesta["uid"]
      })
      console.log(datos);
      var uno = funcionprueba()
      $("#newModal").on('show.bs.modal', function () {
        $('#prueba').bootstrapTable('refreshOptions',{data: datos})
        $('#fechas').bootstrapTable('refreshOptions',{data: fechas})

      });
      $("#newModal").modal("show");

    }).catch(function(error){

  });
 }
 function ConsultarError() {
   var fecha = new Date()
   //document.getElementById('texto').innerHTML  =   fecha.getFullYear().toString() + fecha.getMonth().toString() + fecha.getDate().toString() + fecha.getHours().toString() + fecha.getMinutes().toString() + fecha.getSeconds().toString()
   var a = document.getElementById("datepicker").value;
   var b = document.getElementById("motivo");
   b = b.options[b.selectedIndex].text;

   console.log(a);
   console.log(b);
   var parsefecha = Date.parse(a)
   var fecha = new Date(parsefecha)
   console.log(fecha);
   var dia = fecha.getDate()
   var mes = fecha.getMonth()
   var annio = fecha.getFullYear()
   var patron = String(annio)+String(mes )+String(dia)
   document.getElementById("texto").innerHTML = patron ;
   var ffolio
   var fecha = new Date()
   var prefolio = fecha.getFullYear().toString() + fecha.getMonth().toString() + fecha.getDate ().toString() + fecha.getHours().toString() + fecha.getMinutes().toString() + fecha.getSeconds().toString()
   ffolio = prefolio.replace(/\D/g);
   console.log(patron);
   var requisito = {apartado:b,
   solicitud:patron}


   var url = "https://us-central1-azzheztiaerrorreports.cloudfunctions.net/Reportes";
   fetch(url,{
     method: "POST",
     cache:"no-cache",
     headers: {
               "Content-Type": "application/json",
               "Access-Control-Allow-Origin":"*"
           },
  body: JSON.stringify(requisito)
   }).then(function(response) {
        return response.json().then(function(response){
          return response
        }).catch(function(){
          console.log("sin respuesta");
          alert("sin respuesta")
        })
    }).then(function(respuesta){



      var contenido = []
      var casos = []
      for( var i in respuesta){
        contenido.push([i, respuesta [i]]);
      }
      for( var i in contenido){
        casos.push(contenido [i][0]);
      }
      var casoss = []
      for(i = 0; i<casos.length; i++){
        var a = respuesta[casos[i]];
        console.log(a["contenido"]);
         casoss.push({
          "id":casos[i],
          "cabecera":a["cabecera"],
          "contenido": a["contenido"]
        })

      }
        $('#table').bootstrapTable('refreshOptions',{
          data: casoss           })
    }).catch(function(error){

  });



 }

  function funcionprueba(){
    var datos=[]
    datos.push({
      uno:"Uno",
      dos:"dos"
    })
    return datos
  }
