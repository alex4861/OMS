function createCORSRequest(method, url) {

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


var xhr = new XMLHttpRequest();
if ("withCredentials" in xhr) {
  var url = "https://us-central1-azzheztiaerrorreports.cloudfunctions.net/Reportes";

 // Check if the XMLHttpRequest object has a "withCredentials" property.
 // "withCredentials" only exists on XMLHTTPRequest2 objects.
 xhr.open('POST', url, true);
 xhr.setRequestHeader('Content-type', 'application/json');
console.log("todo ok");
xhr.onreadystatechange = function() {
  console.log("hay un cambio de estado");//Call a function when the state changes.
    if(xhr.readyState == 4 && xhr.status == 200) {
        alert(http.responseText);
    }
}
xhr.send(JSON.stringify(requisito));

} else if (typeof XDomainRequest != "undefined") {
  console.log("vamos a otro lado");
 // Otherwise, check if XDomainRequest.
 // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
 xhr = new XDomainRequest();
 xhr.open(method, url);

} else {

 console.log("Otherwise, CORS is not supported by the browser.");
 xhr = null;

}

return xhr;
}
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
   var ffolio
   var fecha = new Date()
   var prefolio = fecha.getFullYear().toString() + fecha.getMonth().toString() + fecha.getDate ().toString() + fecha.getHours().toString() + fecha.getMinutes().toString() + fecha.getSeconds().toString()
   ffolio = prefolio.replace(/\D/g);
   console.log(ffolio);
   return  ffolio;
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
     headers: {
               "Content-Type": "application/json"
           },
  body: JSON.stringify(requisito)
   }).then(function(response) {
        return response.json();
    }).then(function(muutuja){
        var a = JSON.stringify(muutuja);
        console.log(a);
    });



 }
