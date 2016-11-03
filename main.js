// inladen van de dependencies - externe dependencies inladen via het commando: 
// npm install express --save
// npm install body-parser --save

var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen

// Toevoegen van de code van de dal vervangt onze
// onze lokale 'datastore'. deze variable bewaart onze state. 
var dal = require("./storage.js");

//validatie inladen
var validation = require("./validate.js");

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());

// opvangen van een GET
app.get("/locaties", function (request, response) {
  //stuurt als antwoord de inhoud van onze database. Standaard in json terug gestuurd.
  response.send(dal.AllLocaties());
});

// opvangen van een GET op locaties/{locatie_naam}
app.get("/locaties/:id", function (request, response) {
  var locatie = dal.findLocatie(request.params.id);
  if(locatie) {
    response.send(locatie);
  }else {
    response.status(404).send();
  }
});

// de server starten op poort 4567 (bereikbaar op http://localhost:4567 )
app.listen(4567);
// lijntje voor te zien dat alles is opgestart.
console.log("Server started");