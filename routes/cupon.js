const express = require('express')

const router = express.Router()

const { authCheck, adminCheck  }= require('../middlewares/auth.js')

const {
    create, 
    list,
    remove,
} = require('../controller/cupon.js')




router.post('/cupon', authCheck, adminCheck, create)
router.get('/cupons', list)
router.delete('/cupon/:cuponId', authCheck, adminCheck, remove)


module.exports= router