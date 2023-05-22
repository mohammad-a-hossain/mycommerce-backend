const express = require('express')

const router = express.Router()

const { authCheck, adminCheck  }= require('../middlewares/auth.js')

const {
    create,
    listAllProducts, 
    removeProduct,
     read, 
     update,
     list,
     productCount,
     productStarCount,
     relatedProductList,
     searchFilters
    } = require('../controller/product.js')


router.post('/product', authCheck, adminCheck, create);

router.get('/product/totlaCount', productCount);

 router.get('/products/:limit',listAllProducts)

 router.get('/product/:slug',read)

 router.delete('/product/:slug', authCheck,adminCheck, removeProduct)

 router.put('/product/:slug',authCheck,adminCheck,update)

 router.post('/products', list)


// rating route
router.put('/product/star/:productId', authCheck, productStarCount)

router.get('/products/related/:productId',relatedProductList)


// search routers

router.post('/search/filters', searchFilters)



module.exports= router

