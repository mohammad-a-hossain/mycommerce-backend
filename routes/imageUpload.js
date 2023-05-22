const express = require('express')

const router = express.Router()

const { authCheck, adminCheck  }= require('../middlewares/auth.js')


const {uploadimage, remove } = require('../controller/cloudinaryImageUpload.js')


router.post('/uploadImage', authCheck, adminCheck, uploadimage);
router.post('/removeImage', authCheck, adminCheck, remove );




module.exports= router