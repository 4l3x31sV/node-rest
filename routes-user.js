var express = require('express')
var UserCtrl = require('./controllers/userCtrl2')

var api = express.Router();

api.get("/buscar_todos", UserCtrl.buscarUsuarios2);
api.get("/",(req,res)=>{
    res.send({mensaje: "raiz ed ejemplo"})
})

module.exports = api;