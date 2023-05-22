
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema;
const Category = require('./category')
const SubCategory = require('./subCategory')
const User= require('./user')




const productSchema= new mongoose.Schema(
    {
        title: {
          type: String,
          trim: true,
          required: true,
          maxlength: 32,
          text: true,
        },
        slug: {
          type: String,
          unique: true,
          lowercase: true,
          index: true,
        },
        description: {
          type: String,
          required: true,
          maxlength: 2000,
          text: true,
        },
        price: {
          type: Number,
          required: true,
          trim: true,
      
        },
        category: {
          type: ObjectId,
          ref: Category,
        },
        subCategory: [
          {
            type: ObjectId,
            ref: SubCategory,
          },
        ],
        quantity: Number,
        sold: {
          type: Number,
          default: 0,
        },
        images: {
          type: Array,
        },
        shipping: {
          type: String,
          enum: ["Yes", "No"],
        },
        color:{
            type:String,
            enum:['red','orange','green','blue'],
        },
        brand:{
            type:String,
            enum:['Gsx-fashion','lamia-fashion','Jara-fashion','general-fashion'],
        },
        ratings: [
          {
            star: Number,
            postedBy: { type: ObjectId, ref: "User" },
          },
        ],
      },
      { timestamps: true }
      )
module.exports = mongoose.model('Product',productSchema)









// const productSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       trim: true,
//       required: true,
//       maxlength: 32,
//       text: true,
//     },
//     slug: {
//       type: String,
//       unique: true,
//       lowercase: true,
//       index: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       maxlength: 2000,
//       text: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       trim: true,
//       maxlength: 32,
//     },
//     category: {
//       type: ObjectId,
//       ref: "Category",
//     },
//     subs: [
//       {
//         type: ObjectId,
//         ref: "Sub",
//       },
//     ],
//     quantity: Number,
//     sold: {
//       type: Number,
//       default: 0,
//     },
//     images: {
//       type: Array,
//     },
//     shipping: {
//       type: String,
//       enum: ["Yes", "No"],
//     },
//     color:{
//         type:String,
//         enum:['red','orange','green','blue'],
//     },
//     brand:{
//         type:String,
//         enum:['Gsx-fashion','lamia-fashion','Jara-fashion','general-fashion'],
//     },
//     ratings: [
//       {
//         star: Number,
//         postedBy: { type: ObjectId, ref: "User" },
//       },
//     ],
//   },
//   { timestamps: true }
// );