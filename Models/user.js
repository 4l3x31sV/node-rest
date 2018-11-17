var mongoose = require("mongoose")

var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/usuarios")
var user_schema = new Schema({
    nombre:String,
    apellido:String,
    fecha:Date
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;
