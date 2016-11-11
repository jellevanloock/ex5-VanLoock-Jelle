module.exports = {
    fieldsNotEmpty: function (object) {
        var errors = [];
        var i = 1;
        if(object["naam_drone"] == "" || typeof object["naam_drone"] != "string"){
            errors.push(arguments[i])
        }
        i++
        if(object["aantal"] <= 0 || typeof object["aantal"] != "number"){
            errors.push(arguments[i]);
        }
        i++
        if(object["naam_locatie"] == "" || typeof object["naam_locatie"] != "string"){
            errors.push(arguments[i]);
        }
        i++
        if(object["uur"] == "" || typeof object["uur"] != "string"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }

};