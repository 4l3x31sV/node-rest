
const User = require('../Models/user').User
const service = require('../services')

function login(req,res){
    console.log(JSON.stringify(User))
    User.find({nombre: req.body.nombre}, (err,user)=>{
        if(err) return res.status(500).send({mensaje: err});
        if(!user) return res.status(404).send({mensaje: "Usuario no encontrado"})
        req.user = user;
        res.status(200).send({
            mensaje:"Usuario logueado",
            token: service.createToken(user)
        })
    })
}
module.exports = {
    login
}