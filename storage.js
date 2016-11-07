module.exports = {
    aanwezigheden: {},

    saveAanwezighedenPerLocatie: function(locatie) {
        this.aanwezigheden[locatie.id] = locatie;
    },
    AllAanwezigheden: function() {
        var rtnValue = [];
        for (var item in this.aanwezigheden) {
            rtnValue.push(this.aanwezigheden[item]);
        };
        return rtnValue;
    },

    findAanwezighedenPerLocatie: function(naam) {
        return this.aanwezigheden[naam];
    },
    locaties: {},

    saveLocatie: function(locatie) {
        this.locaties[locatie.id] = locatie;
    },
    AllLocaties: function() {
        var rtnValue = [];
        for (var item in this.locaties) {
            rtnValue.push(this.locaties[item]);
        };
        return rtnValue;
    },
    findLocatie: function(id) {
        return this.locaties[id];
    }
};
