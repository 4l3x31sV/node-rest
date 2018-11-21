
const User = require('../Models/user').User
const service = require('../services')

function login(req,res){
    console.log(JSON.stringify(User))
    User.findOne({nombre: req.body.nombre}, (err,user)=>{
        if(err) return res.status(500).send({mensaje: err});
        if(!user) return res.status(404).send({mensaje: "Usuario no encontrado"})
        req.user = user;
        res.status(200).send({
            mensaje:"Usuario logueado",
            token: service.createToken(user)
        })
    })
}

function buscarUsuarios(req,res){
    console.log("Ingresa a la fucion")

    User.find({},(err,cruds)=>{
        console.log(JSON.stringify(cruds))
        if(!err){
            res.send(cruds)
        }else {
            res.send(err)
        }
    })
}

function insertarUsuario(req,res){
    var user = new User({
        nombre: req.body.nombre,
        apellido:req.body.apellido,
        edad: req.body.edad,
        fecha: new Date()
    })

    user.save().then((us)=>{
        console.log(JSON.stringify(us))
        res.send(us)
    },(err)=>{
        console.log(JSON.stringify(err))
        res.send(err)
    })
}

function buscarNombre(req,res){
    User.find({nombre: {$regex: req.params.nombre}}, (err,usuario)=>{
        if(err){
            res.send(err)
        }else{
            res.send(usuario);
        }
    })
}

function actualizarUsuario(req,res){
    User.findOne({nombre: {$regex: req.body.nombre}}, (err,usuario)=>{
        if(err){
            res.send(err)
        }else{
            //usuario.nombre = req.body.nombre;
            usuario.apellido = req.body.apellido;
            usuario.save((err)=>{
                if(!err){
                    res.send({mensaje:"Se actualizo los datos"})
                }else{
                    res.send({mensaje:"Error al actualizar"})
                }
            })
        }
    })
}

function eliminarUsuario(req,res){
    User.findOne({nombre: {$regex: req.params.nombre}}, (err,usuario)=>{
        if(err){
            res.send(err)
        }else{
            console.log(JSON
                .stringify(usuario));

            User.findByIdAndRemove(usuario._id,(err)=>{
                if(err){
                    res.send({mensaje:"Error al eliminar"})
                }else{
                    res.send({mensaje:"Se ha eliminado correctamente"})
                }
            })
        }
    })
}


function mensaje(req,res){
    User.find({nombre: {$regex: req.params.nombre}}, (err,usuario)=>{
        res.send("Hola mundo");
    })
}


function primerMensaje(req,res){
    var saludo = {
        mensaje : "nuestro primer Servicio WEB REST get",
        estado: true
    }
    res.send(saludo);
}

function mensajePost(req,res){
    console.log(JSON.stringify(req.body));
    console.log(req.body.apellido);
    var saludo = {
        mensaje : "nuestro primer Servicio WEB REST post",
        estado: true
    }
    res.send(saludo);
}

function mensajeParam(req,res){
    console.log(JSON.stringify(req.params));
    var saludo = {
        mensaje : "nuestro primer Servicio WEB REST get",
        estado: true
    }
    res.send(saludo);
}

function invoca(req,res){
    User.find({},(err,crud)=>{
        if(!err){
            res.send(crud)
        }else {
            res.send(err)
        }
    })
}

module.exports = {
    login,
    buscarUsuarios,
    insertarUsuario,
    buscarNombre,
    actualizarUsuario,
    eliminarUsuario,
    mensaje,
    primerMensaje,
    mensajePost,
    mensajeParam,
    invoca
}