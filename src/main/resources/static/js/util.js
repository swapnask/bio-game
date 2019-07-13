function validateObjectFields(object, fields) {
    var msg = "Following fields are not defined: ";
    var fieldsMissing = false;
    for (var i = 0; i < fields.length; i++) {
        if (object[fields[i]] == "" || object[fields[i]] == undefined) {
            msg = msg + fields[i] + ', ';
            fieldsMissing = true;
        }
    }
    return {
        fieldsMissing: fieldsMissing,
        msg: msg.slice(0, -2)
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}