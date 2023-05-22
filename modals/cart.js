const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//const Product = require('../modals/product')

const cartSchema = new mongoose.Schema(
  {
   
    products: [
      {
        count: Number,
        color: String,
        price: Number,
        product: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
    cartTotal:{
      type: Number,
          },

    totalAfterDiscount: Number,

    orderdBy: { 
      type: ObjectId,
       ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);





















// const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema()

// const userCartSchema = new mongoose.Schema({
//        products:[
//          { 
//             product:{
//               type:ObjectId,
//               ref:'Product',
//            },
//             count:Number,
//             color:String,
//             price:Number,
//         },

//        ],

//        cartTotla:Number,
//        totalAfterDiscount:Number,
//        orderBy:{
//         type:ObjectId,
//         ref:'User'
//        },

// }, {timestamps:true })

// module.exports = mongoose.model('Cart', userCartSchema)