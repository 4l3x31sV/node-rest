var express = require("express");
var bodyParser = require("body-parser");
var User = require("./Models/user").User;
var usrCtrl = require('./controllers/userCtrl');
var path = require('path');
var auth = require('./middlewares/auth')
var router_user = require('./routes-user')
var methodOverride = require("method-override");
var app = express();

app.set("view engine", "pug")

const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

/*app.get('/user/all',usrCtrl.buscarUsuarios);
app.post("/user/insert", (req,res)=>{
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


})
app.get("/user/:nombre", (req,res)=>{
    User.find({nombre: {$regex: req.params.nombre}}, (err,usuario)=>{
        if(err){
            res.send(err)
        }else{
            res.send(usuario);
        }
    })
})
app.put("/user/update", (req,res)=>{
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
})
app.delete("/user/delete/:nombre", (req,res)=>{
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
})
app.get("/", (req,res)=>{
    res.send("Hola mundo");
})
app.get("/saludo",(req,res)=>{
    var saludo = {
        mensaje : "nuestro primer Servicio WEB REST get",
        estado: true
    }
    res.send(saludo);
})
app.post("/saludo", (req,res)=>{
    console.log(JSON.stringify(req.body));
    console.log(req.body.apellido);
    var saludo = {
        mensaje : "nuestro primer Servicio WEB REST post",
        estado: true
    }
    res.send(saludo);
})
app.get("/params/:nombre/:apellido",(req,res)=>{
    console.log(JSON.stringify(req.params));
    var saludo = {
        mensaje : "nuestro primer Servicio WEB REST get",
        estado: true
    }
    res.send(saludo);
})
app.post('/logueo', usrCtrl.login);*/
// /app/login
    //app/registro
    //user/find
app.get('/user/all',usrCtrl.buscarUsuarios);
app.post("/user/insert", usrCtrl.insertarUsuario)
app.get("/user/:nombre", usrCtrl.buscarNombre)
app.put("/user/update", usrCtrl.actualizarUsuario)
app.delete("/user/delete/:nombre", usrCtrl.eliminarUsuario)
app.get("/", usrCtrl.mensaje)
app.get("/saludo", usrCtrl.primerMensaje)
app.post("/saludo", usrCtrl.mensajePost)
app.get("/params/:nombre/:apellido",usrCtrl.mensajeParam)
app.post('/logueo', usrCtrl.login);


app.get('/invocar', usrCtrl.invoca)


app.get('/invocar', (req,res)=>{
    User.find({},(err,crud)=>{
        if(!err){
            res.send(crud)
        }else {
            res.send(err)
        }
    })
})
app.use("/ejemplo",router_user)
app.get("/web", (req,res)=>{
    res.render("index")
})
app.get("/web/inicio_login",(req,res)=>{
    res.render("login")
})
app.post("/web/inicio_session",(req,res)=>{
    
    User.findOne({nombre: req.body.user}, (err,user)=>{
        if(err) return res.status(500).send({mensaje: err});
        if(!user) return res.status(404).send({mensaje: "Usuario no encontrado"})
        req.user = user;
        res.redirect("/web")
    })
    
})
app.listen(PORT, ()=>{
    console.log("Servidor Inicializado en :" + PORT)
})