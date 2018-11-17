var mongoose = require("mongoose")

var Schema = mongoose.Schema;
var email_regx = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Coloca un email valido"]
mongoose.connect("mongodb://localhost/usuarios")
/*
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
*/
var posbiles_valores = ['M','F'];
var password_validation = {
    validator: (p)=>{
        return this.password_confirmation === p;
    },
    message: "Las contraseñas no coinciden"
}
var user_schema = new Schema({
    nombre:String,
    apellido:String,
    fecha: {
        type: Date,
        required:"El campo Fecha s requerido"
    },
    email:{type: String,
        required: "El campo es obligatorio",
        match: email_regx},
    edad: {
        type: Number,
        max:[100, "La edad no puede ser mayor a 100"],
        min:[18, "La edad minima es de 18 años"]
    },
    genero: {
        type: String,
        enum: {
            values:posbiles_valores,
            message: "Opciones no validas"}
    },
    password:{
        type: String,
        min: [5, "El password es muy corto"],
        validate: password_validation
    }
});
user_schema.virtual("password_confirmation").get(()=>{
    return this.p_c
}).set((password)=>{
    this.p_c = password;
})
var User = mongoose.model("User", user_schema);

module.exports.User = User;
