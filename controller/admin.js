const Order = require('../modals/order')


exports.orders= async(req,res) =>{
       let allOrders= await Order.find({}).sort('-createdAt').populate('products.product').exec()

       res.json(allOrders)
}

exports.orderStatus = async(req,res)=>{
  //  console.log(req.body)
    const {orderId, orderStatus} = req.body
    let updateStatus = Order.findByIdAndUpdate(orderId, {orderStatus}, {new:true}).exec()
    res.json(updateStatus)
}