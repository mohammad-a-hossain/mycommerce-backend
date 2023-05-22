const express = require('express')

const router = express.Router()

const { authCheck,adminCheck} = require('../middlewares/auth')

const { create,read,list,update,remove,getSubProduct } = require('../controller/subCategory.js') 


router.post('/subCategory', authCheck, adminCheck, create);
router.get('/subCategories', list)
router.get('/subCategory/:slug',read )
router.get('/subcategoryProduct/:slug',getSubProduct)
router.put('/subCategory/:slug', authCheck, adminCheck, update)
router.delete('/subCategory/:slug', authCheck,adminCheck, remove)

module.exports = router
