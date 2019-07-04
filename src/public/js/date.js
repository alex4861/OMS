
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
        casoss.push({
         "orden":casos[i],
         "estatus":a["completed"],
         "direccion": a["calle"],
         "persona": a["persona"],
         "tipo": a["servicio"],

       })
       console.log(casoss);

     }
       $('#table').bootstrapTable('refreshOptions',{
         data: casoss           })
   }).catch(function(error){

 });
 }
 function ConsultarReporte() {
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
