
const User = require('../Models/user').User
const service = require('../services')

function buscarUsuarios2(req,res){
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

module.exports = {
    buscarUsuarios2

}