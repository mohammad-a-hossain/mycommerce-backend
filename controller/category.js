
const Category = require('../modals/category');
const SubCategory = require('../modals/subCategory');
const Product = require('../modals/product')

const slugify= require('slugify');

exports.create= async (req,res)=>{
        const {name} = req.body
        try{
            res.json( await new Category({name, slug: slugify(name)}).save() )
        }catch(err){
            console.log(err);
            res.status(400).send('category create failed')
        }
      
}

exports.list= async (req,res) =>{
   res.json(await Category.find({}).sort({createdAt:-1}).exec() )
}

exports.read= async (req,res) =>{
    let category = await Category.findOne({slug:req.params.slug}).exec()
    console.log(req.params.slug)
    res.json(category)

}
//for frontend fetching  category related product
exports.getCategory= async(req,res)=>{
  let category = await Category.findOne({slug:req.params.slug}).exec()
  const products= await Product.find({category})
          .populate('category')
          .populate('postedBy','_id name')
          .exec()
          
       res.json({
        category,
        products
       })
}

exports.update = async (req,res)=>{
    const {name} = req.body 
    try{
       const updateCate = await Category.findOneAndUpdate({slug: req.params.slug}, {name, slug:slugify(name)},{new:true})
        res.json(updateCate)
    }catch(err){
       console.log(err);
       res.status(400).send('category updte failed')
    }

}

exports.remove= async (req, res) =>{
  try{
     const deletedCate = await Category.findOneAndDelete({slug:req.params.slug})
     res.json(deletedCate)
  }catch(err){
    console.log(err);
    res.status(400).send('cate deleted error')
  }
}


exports.getSubCategoryForCateProduct= async (req, res)=>{
    
   SubCategory.find({parentId: req.params._id }).exec((err, subCategory)=>{
    if(err) console.log(err)
    res.json(subCategory)
   })
      
    } 

exports.getSubCategory=async(req, res) =>{
  SubCategory.find({parentId: req.params._id }).exec((err, subCategory)=>{
    if(err) console.log(err)
    res.json(subCategory)
   })
}
 