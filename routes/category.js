const express = require('express')

const router = express.Router()

const { authCheck, adminCheck  }= require('../middlewares/auth.js')

const {
    create, 
    read, 
    update,
    list,
    remove,
   getSubCategoryForCateProduct,
   getSubCategory,
   getCategory
} = require('../controller/category.js')

//const { getSubCategoryForCateProduct } = require('../controller/subCategory.js')


router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list)
router.get('/category/:slug',read )
router.get('/categoryProduct/:slug',getCategory)
router.put('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck,adminCheck, remove)
router.get('/category/subCategory/:_id', getSubCategory )
router.get('/category/subCategories/:_id', getSubCategoryForCateProduct)



module.exports= router