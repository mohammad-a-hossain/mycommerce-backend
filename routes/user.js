const express = require('express')
//const { createOrUpdateUser } = require('../controller/user')


const { authCheck} = require('../middlewares/auth')

const
 { userCart,
    getUserCart,
    emptyUserCart ,
    userAddress,
    userCuponCheck,
    createOrder,
    orders,addToWishList,wishlists,removeWishlist} = require('../controller/user')



const router = express.Router()

//router.get('/user',createOrUpdateUser)


router.post('/user/cart', authCheck, userCart)

router.get('/user/cart', authCheck, getUserCart)

router.delete('/user/cart', authCheck, emptyUserCart)

router.post('/user/cart/address', authCheck, userAddress)

// discount

router.post('/user/cart/userCupon',authCheck, userCuponCheck)



// order routes
router.post('/user/order', authCheck, createOrder)

//router.get('/user/order/history',authCheck, userOreders)
router.get('/user/orders', authCheck, orders);




// wistlist 
router.post('/user/wishlist', authCheck, addToWishList);
router.get('/user/wishlists', authCheck, wishlists);
router.put('/user/wishlist/:productId', authCheck, removeWishlist);

module.exports= router