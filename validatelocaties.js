module.exports = {
    fieldsNotEmpty: function (object) {
        var errors = [];
        var i = 1;
        if(object["naam_drone"] == "" || typeof object["naam_drone"] != "string"){
            errors.push(arguments[i])
        }
        i++
        if(object["mac_address_drone"] == "" || typeof object["mac_address_drone"] != "string"){
            errors.push(arguments[i]);
        }
        i++
        if(object["naam_locatie"] == "" || typeof object["naam_locatie"] != "string"){
            errors.push(arguments[i]);
        }
        i++
        if(typeof object["beschrijving"] != "string"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }

};