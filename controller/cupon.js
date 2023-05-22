const Cupon = require("../modals/cupon")


exports.create = async (req,res)=>{

try{
 const { name, expiary, discount} = req.body.cupon
 res.json(await new Cupon({ name, expiary, discount }).save())
}catch(err){
  console.log(err)
}

}

exports.list = async( req, res) =>{
    try{
      res.json( await Cupon.find({}).sort({createdAt :-1}).exec())
    }catch(err){
        console.log(err)
    }
}

exports.remove =async( req, res) =>{
    try{
     res.json( await Cupon.findByIdAndDelete(req.params.cuponId)).exec()
    }catch(err){
        console.log(err)
    }
}

