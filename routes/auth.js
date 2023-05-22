const express = require('express')

const router = express.Router()
const {createOrUpdateUser,getCurrentUser} = require('../controller/auth')

//auth middleware
const {authCheck, adminCheck} = require('../middlewares/auth')

router.post('/create-Or-UpdateUser',authCheck, createOrUpdateUser)

router.post('/current-user',authCheck, getCurrentUser)
router.post('/current-admin',authCheck,adminCheck, getCurrentUser)


module.exports= router
 