const Product = require("../modals/product")
const SubCategory = require("../modals/subCategory")
const slugify = require('slugify')

exports.create = async (req,res)=>{
  const { name, parentId} = req.body 
  try{
    res.json( await new SubCategory({name,parentId, slug:(slugify(name))}).save() )

  }catch(err){
    console.log(err)
    res.status(400).send('subcategory create failed')
  }
}

exports.read= async (req, res) =>{
  
    let subs = await SubCategory.findOne({ slug: req.params.slug }).exec();
    const products = await Product.find({ subCategory: subs })
      .populate("category")
      .exec();
  
    res.json({
      subs,
      products,
    });
}

exports.list = async (req,res) =>{
    res.json( await SubCategory.find({}).sort({createdAt:-1}).exec() )
}

exports.update= async (req,res)=>{
    const { name,parentId } = req.body 
    try{
     const updateSubCate= await SubCategory.findOneAndUpdate({slug:req.params.slug},{name,parentId, slug:slugify(name)},{new:true})
     res.json(updateSubCate)
    }catch(err){
        console.log(err);
        res.status(400).send('sub category update fail')
    }
}

exports.remove= async(req, res) =>{
    try{
    const deletedSubCate= await SubCategory.findOneAndDelete({slug:req.params.slug})
    res.json(deletedSubCate)
    }catch(err){
        console.log(err);
    res.status(400).send('sub cate deleted failed')
    }
    
    
  
}


// getting all sub cate related product
exports.getSubProduct =async(req, res)=>{
  let subCategory = await SubCategory.findOne({slug:req.params.slug}).exec()

   const products= await Product.find({subCategory:subCategory})
   .populate('category')
   .exec()
    console.log(products)
   res.json({
    subCategory,
    products
   })
}


