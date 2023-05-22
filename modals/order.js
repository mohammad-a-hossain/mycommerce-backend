const mongoose = require('mongoose')
const Product = require('../modals/product')
const User = require('../modals/user')
const {ObjectId} = mongoose.Schema




const orderSchema = new mongoose.Schema({ 
   products:[ 
   {
    product:{
        type:ObjectId,
        ref:Product
    },
    count:Number,
    color:String
},
],
paymentIntent:{},
orderStatus:{
    type:String,
    default:'not processing',
    enum:[
        'not processing',
        'processing',
        'dispatched',
        'completed',
        'cancelled'
    ]
},
orderdBy:{ type:ObjectId, ref:User},

},{timestamps:true})

module.exports = mongoose.model('Order',orderSchema)
