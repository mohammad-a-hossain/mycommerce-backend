const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const Category = require('../modals/category')

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:20,
        minlength:3
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    },
    
    parentId:{
        type:ObjectId,
        ref:Category,
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model('Subcategory',subCategorySchema)