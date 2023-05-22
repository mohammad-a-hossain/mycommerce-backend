
const User = require('../modals/user')
const Cart = require('../modals/cart')
const Product = require('../modals/product')
const Cupon = require('../modals/cupon')

const stripe = require('stripe')(process.env.STRIPE_SECRET)



exports.createPaymentIntent= async(req, res)=>{
   //console.log(req.body)
   const { couponApplied} = req.body
     // cupon apply
     // calculate price
     //getting the user
     const user = await User.findOne({email:req.user.email}).exec() 

     // getting the cart total of the user
     const { cartTotal,
           totalAfterDiscount
       } = await Cart.findOne({orderdBy: user._id}).exec()


     console.log('cart totla', cartTotal, 'after discutn', totalAfterDiscount)

     let finalTotal = 0 

   //   if(couponApplied && totalAfterDiscount){
   //    finalTotal = totalAfterDiscount * 100
   //   }else{
   //    finalTotal = cartTotal * 100
   //   }

   if (couponApplied && totalAfterDiscount) {
      finalTotal = totalAfterDiscount * 100;
    } else {
      finalTotal = cartTotal * 100;
    }



     // create payment intent 
     const paymentIntent = await stripe.paymentIntents.create({
        amount:finalTotal,
        currency:'usd'
     })

    // console.table('final payble',finalTotal)

     res.send({ 
      clientSecret: paymentIntent.client_secret,
       cartTotal,
        totalAfterDiscount,
        payable:finalTotal })
}


