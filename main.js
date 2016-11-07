//Samen gewerkt met Jelle Van Loock en Kevin Aerts

// inladen van de dependencies
var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen
var uuid = require('uuid');

// Toevoegen van de code van de dal vervangt onze
// onze lokale 'datastore'. deze variable bewaart onze state.
var dal = require("./storage.js");
//validatie inladen
var validation = require("./validate.js");

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());

// locaties beschikbaar maken
app.get("/locaties", function(request, response) {
    //Antwoord met alle instanties van /locaties in json-formaat
    response.send(dal.AllLocaties());
});

// opvangen van een GET op /locaties/[locatie_naam]
app.get("/locaties/:id", function(request, response) {
    var locatie = dal.findLocatie(request.params.id);
    if (locatie) {
        response.send(locatie);
    } else {
        response.status(404).send();
    }
});

// opvangen van POST's op /locaties.
app.post("/locaties", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var locatie = request.body;

    // Valideren dat velden bestaan
    var errors = validation.fieldsNotEmpty(locatie, "naam", "mac_address_drone", "beschrijving");
    if (errors) {
        response.status(400).send({
            msg: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    // Valideren dat we niet dezelfde locatie 2x hebben
    var existingLocatie = dal.findLocatie(locatie.naam);
    if (existingLocatie) {
        response.status(409).send({
            msg: "Locatienaam must be unique, it's already registered",
            link: "../locaties/" + existingLocatie.id
        });
        return;
    }

    // De naam van de locatie wordt toegekend als ID
    locatie.id = locatie.naam;
    // de locatie toevoegen in onze de lokale opslag 'dal'.
    dal.saveLocatie(locatie);
    // de default httpstatus (200) overschrijven met 204 en geen antwoord specifiÃ«ren.
    response.status(201).location("../locaties/" + locatie.id).send();
});


// opvangen van een GET op /aanwezigheden
app.get("/aanwezigheden", function(request, response) {
    //stuurt als antwoord de inhoud van onze database. Standaard in json terug gestuurd.
    response.send(dal.AllAanwezigheden());
});

// opvangen van een GET op /aanwezigheden/[UUID]
app.get("/aanwezigheden/:id", function(request, response) {
    var locatie = dal.findAanwezighedenPerLocatie(request.params.id);
    if (locatie) {
        response.send(locatie);
    } else {
        response.status(404).send();
    }
});

// POST's op /aanwezigheden opvangen
app.post("/aanwezigheden", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var personen = request.body;

    // Valideren dat velden bestaan
    var errors = validation.fieldsNotEmpty(personen, "drone_naam", "aantal", "locatie_naam", "uur");
    if (errors) {
        response.status(400).send({
            msg: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    // een random UUID geven aan ons nieuwe 'persoon'.
    personen.id = uuid.v4();
    // de 'persoon' toevoegen in onze 'dal'.
    dal.saveAanwezighedenPerLocatie(personen);
    // de default httpstatus (200) overschrijven met 204 en geen antwoord specifiÃ«ren.
    response.status(201).location("../aanwezigheden/" + personen.id).send();
});

// de server starten op poort 4567
app.listen(4567);

// Bevestiging
console.log("Server started");
