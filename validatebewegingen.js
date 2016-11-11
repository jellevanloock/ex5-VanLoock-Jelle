module.exports = {
    fieldsNotEmpty: function (object) {
        "beweging"
        var errors = [];
        var i = 1;
        if(typeof object["beginlocatie"] != "object"){
            errors.push(arguments[i])
        }
        i++
        if(typeof object["eindlocatie"] != "object"){
            errors.push(arguments[i]);
        }
        i++
        if(object["duur"] == 0 || typeof object["duur"] != "number"){
            errors.push(arguments[i]);
        }
        i++
        if(typeof object["weer"] != "string"){
            errors.push(arguments[i]);
        }
          i++
        if(object["beweging"] == "" || typeof object["beweging"] != "boolean"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }

};