var express = require("express");
var bodyParser = require("body-parser");
var User = require("./Models/user").User;


var app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/user/insert", (req,res)=>{
    var user = new User({
        nombre: req.body.nombre,
        apellido:req.body.apellido,
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
app.get("/user/all", (req,res)=>{
    User.find({},(err,cruds)=>{
        if(!err){
            res.send(cruds)
        }else {
            res.send(err)
        }
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

app.listen(PORT, ()=>{
    console.log("Servidor Inicializado en :" + PORT)
})