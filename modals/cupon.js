const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//const Product = require('../modals/product')

const cuponSchema = new mongoose.Schema(
  {
   name:{
     type:String,
     trim:true,
     unique: true,
     uppercase: true,
     requird:'name is require',
   },
   expiary:{
    type:Date,
    requird:true,

   },
   discount:{
    type:Number,
    requird:true
   },
 

},{ timestamps: true }
)

module.exports = mongoose.model("Cupon", cuponSchema);


