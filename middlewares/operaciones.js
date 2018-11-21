
function valida(req,res,next){
    if(false)
    {
        return res.status(200).send({mensaje:"Incorrecto"})
    }
    else{
        next()
    }
}