// exports.createOrUpdateUser=(req,res)=>{
//     res.json({
//         data:'you call user controller and api'
//     })
//     }

const User = require("../modals/user")
const Cart = require('../modals/cart')
const Product= require('../modals/product')
const Cupon = require('../modals/cupon')
const Order = require("../modals/order")

//const product = require("../modals/product")

    
exports.userCart = async (req, res)=>{
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDb.price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart ----> ", newCart);
  res.json({ ok: true });
}


// exports.getUserCart = async (req, res)=>{
//      const user = await User.findOne( { email: req.body.email}).exec()

//      let cart = await Cart.findOne({ orderdBy: user._id })
//      .populate('products.product', '_id title price totalAfterDiscount').exec()
   
//      const { product, cartTotal, totalAfterDiscount} = cart 

//      res.json({ product, cartTotal, totalAfterDiscount} )
// }

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyUserCart = async ( req, res) =>{
      const user = await User.findOne({email:req.user.email}).exec()

      const cart = await Cart.findOneAndRemove({orderdBy: user._id}).exec()
      res.json(cart)


}

exports.userAddress = async(req, res) =>{
   const userAddress = await User.findOneAndUpdate({email:req.user.email},{address:req.body.address}).exec()
  res.json({ok:true})

  }






  //cupon on discount
  exports.userCuponCheck = async (req,res) =>{
   const { cupon } = req.body 

   let validCupon = await Cupon.findOne({name:cupon}).exec()
  if(validCupon === null){
    return res.json({
      err:"invalid cupon"
    })
  }
  console.log('valid cupon', validCupon);

  const user =await User.findOne({email:req.user.email}).exec()

   let {products, cartTotal } = await Cart.findOne({orderdBy:user._id})
   .populate('products.product','_id title price')
  .exec()

  console.log('cartttola', cartTotal, 'disc', validCupon.discount)

   let totalAfterDiscount = (cartTotal - (cartTotal * validCupon.discount) / 100).toFixed(2)
     console.log('totladisc', totalAfterDiscount)

     Cart.findOneAndUpdate(
      { orderdBy: user._id },
      { totalAfterDiscount },
      { new: true }
    ).exec()
  
    res.json(totalAfterDiscount)

 
  }


  exports.createOrder = async(req, res) =>{

    const {paymentIntent }= req.body.stripeResponse 
   // console.log('from order payment istanc', paymentIntent);

    const user = await User.findOne({email:req.user.email}).exec()

    let { products }= await Cart.findOne({orderdBy:user._id}).exec()

    let newOrder = await new Order({
      products,
      paymentIntent,
      orderdBy:user._id
    }).save()


    // this part can deduct the total quantity an add sold increment
    let bulkOption = products.map((item) =>{
      return {
        updateOne:{
          filter:{ _id: item.product._id},
          update:{ $inc: { quantity: - item.count, sold: + item.count} },
        }
      }
    })

    let update = await Product.bulkWrite(bulkOption, {new: true})
    console.log('product quantity decre and sold inc', update);

    console.log('new order save as', newOrder);

    res.json({ok:true})

  }



  exports.orders = async (req, res) => {

    let user = await User.findOne({ email: req.user.email }).exec();
  
    let userOrders = await Order.find({ orderdBy: user._id })
      .populate("products.product")
      .exec();
  
    res.json(userOrders);
  };



  exports.addToWishList= async(req,res) =>{
        const { productId} = req.body 
      
        const user = await User.findOneAndUpdate(
          { email: req.user.email },
          { $addToSet: { wishlist: productId } }
        ).exec()
        res.json({ ok: true })
  }

  


  exports.wishlists= async(req, res) =>{
    const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
}
    



    exports.removeWishlist =async (req, res) =>{
         const {productId} = req.params

         const user = await User.findOneAndUpdate({email: req.user.email},{$pull:{wishlist:productId}} ).exec()
         res.json({ok:true})
    }