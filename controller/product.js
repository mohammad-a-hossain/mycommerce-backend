//const { UserImportBuilder } = require('firebase-admin/lib/auth/user-import-builder');
const Product = require('../modals/product')
const slugify = require("slugify");
const User = require('../modals/user');
const category = require('../modals/category');
const subCategory = require('../modals/subCategory');


 
exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    })
  }
    
  }


 exports.listAllProducts = async (req, res)=>{
    let products= await Product.find({})
    .limit(parseInt(req.params.limit))
    .populate('category')
    .populate('subCategory')
    .sort([['createdAt','desc']])
    .exec()
    res.json(products)
  }

  // exports.listAll = async (req, res) => {
  //   let products = await Product.find({})
  //     .limit(parseInt(req.params.count))
  //     .populate("category")
  //     .populate("subs")
  //     .sort([["createdAt", "desc"]])
  //     .exec();
  //   res.json(products);
  // };
  






  exports.removeProduct= async (req,res)=>{
    try{
     let deletePro = await Product.findOneAndRemove({slug:req.params.slug}).exec()
     res.json(deletePro)
    }catch(err){
      console.log(err);
      return res.status(400).send('product remove failed')
    }
  }

  exports.read = async (req, res) => {
     const ReadSingleProduct = await Product.findOne({slug:req.params.slug})
            .populate('category')
            .populate('subCategory')
             .exec()
             res.json(ReadSingleProduct)
    }



  exports.update= async (req,res) =>{
    try{
      if(req.body.title){
        req.body.slug = slugify(req.body.title)
      }
      const updateProduct = await Product.findOneAndUpdate({slug:req.params.slug},req.body,{new:true}).exec()
      res.json(updateProduct)

    }catch(err){
          console.log('prod update data', err)
          //return res.status(400).send('product updat failed')
          res.status(400).json({
            err: err.message
          })
    }
  }

    // without pagination
    // exports.list = async (req, res) => {
    //   // console.table(req.body);
    //   try {
    //     // createdAt/updatedAt, desc/asc, 3
    //     const { sort, order, page } = req.body;
    //     const currentPage = page || 1;
    //     const perPage = 3; // 3
    
    //     const products = await Product.find({})
    //       .skip((currentPage - 1) * perPage)
    //       .populate("category")
    //       .populate("subs")
    //       .sort([[sort, order]])
    //       .limit(perPage)
    //       .exec();
    
    //     res.json(products);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    


  // with pagination
  exports.list= async (req, res)=>{
    console.table(req.body)
      
     try{ 
      const {sort, order,page} = req.body
      const currentPage = page || 1
      const perpage =3
     
      const products = await Product.find({})
      .skip((currentPage -1) * perpage)
      .populate('category')
      .populate('subCategory')
      .sort([[sort, order]])
      .limit(perpage)
      .exec()
      res.json(products)
     }
     catch(err){
      console.log(err);
     }
  }








  exports.productCount = async (req, res)=>{
    const totalP= await Product.find({}).estimatedDocumentCount().exec()
    res.json(totalP)
  }
  

  // product start put controller

  // exports.productStarCount =async (req, res) =>{

  //   const product = await Product.findById(req.params.productId).exec()
  //   const user =  await User.findOne({email: req.user.email}).exec()
  //   const {star} = req.body 

  //   //now if user is updating !!

   
  //   let existingRating= product.ratings.find((rat) => rat.postedBy.toString() === user._id.toString() )
  //   // if user didnt rated then push a new rating to it

  //   if(existingRating === undefined){
  //     let newUserAddtoRating = await Product.findByIdAndUpdate(
  //       product._id,{
  //         $push:{ ratings: {star, postedBy:user._id } },
  //       },
  //       {new:true}
  //     ).exec()
  //     console.log('ratting added', newUserAddtoRating);
  //     res.json(newUserAddtoRating)
  //   }else{
  //      // then if loggedin user rated this product !! 
  //      const ratingUpdate = Product.updateOne(
  //       { ratings: { SelectMatch: existingRating },
  //      },
  //      { $set:{ "ratings.s.star":star } },
  //      {new: true}
  //      ).exec()
  //      console.log('rating updated', ratingUpdate);
  //      res.json(ratingUpdate)
  //   }
    

  // }


  exports.productStarCount = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;
  
    // who is updating?
    // check if currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find(
      (ele) => ele.postedBy?.toString() === req.user._id?.toString()
    )
  
    // if user haven't left rating yet, push it
      // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
    } else {
      const ratingUpdated = await Product.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject },
        },
        { $set: { "ratings.$.star": star } },
        { new: true }
      ).exec();
      console.log("ratingUpdated", ratingUpdated);
      res.json(ratingUpdated);
    }
  };
  


  exports.relatedProductList =async(req, res)=>{
       const product = await Product.findById(req.params.productId).exec()


       const relatedProduct = await Product.find({
        _id: { $ne: product._id},
        category: product.category
       })
       .limit(3)
       .populate('category')
       .populate('subCategory')
       .populate("ratings.postedBy")
       .exec()

       res.json(relatedProduct)
  }


 
 
  /* filter part */


  const handleQuery = async(req, res, query)=>{
    let prodcuts= await Product.find({$text: {$search :query}})
    .populate('category', '_id name')
    .populate('subCategory', '_id name')
    .populate('postedBy', '_id name')
    .exec()
    res.json(prodcuts)
  }

  const handlePrice = async(req, res,price)=>{
    try{
      let products= await Product.find({
          
            price:{
              $gte:price[0],
              $lte:price[1]
            },
          
        })
        .populate('category')
        .populate('subCategory')
        .populate('postedBy', '_id name')
        res.json(products)
    }catch(err){
      console.log(err)
    }
  
  }

  const handleCategory= async (req, res, category)=>{
       try{
       let products = await Product.find({category})
       .populate('category')
       .populate('subCategory')
       .populate('postedBy', '_id name')
       res.json(products)
       }catch(err){
        console.log(err)
       }
  }


  const handleStar= async(req,res,stars)=>{ 
         Product.aggregate([
          {
            $project: {
              document: "$$ROOT",
              // title: "$title",
              floorAverage: {
                $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
              },
            },
          },
          { $match: { floorAverage: stars } },
         ])
         .limit(12)
         .exec((err, aggregates)=>{
          if(err) console.log('aggregate err', err);

          Product.find({_id: aggregates})
            .populate('category','_id name')
            .populate('subCategory','_id name')
           .populate('postedBy', '_id name')
            .exec((err, products) =>{
              if(err) console.log('agg err', err)
              res.json(products)
            })
       
         })
  }
  const handleSubCategory = async (req, res,subCategory)=>{
           
                let products= await Product.find({subCategory})
                .populate('category','_id name')
                .populate('subCategory','_id name')
                .populate('postedBy', '_id name')
                .exec()  
                res.json(products)
              
  }
  const handleBrand = async(req, res, brand) =>{
     let products= await Product.find({brand})
     .populate('category','_id name')
     .populate('subCategory','_id name')
     .populate('postedBy', '_id name')
     .exec()  
     res.json(products)
  }

  const handleColor = async(req, res, color)=>{
      let products = await Product.find({color})
      .populate('category','_id name')
      .populate('subCategory','_id name')
      .populate('postedBy', '_id name')
      .exec()  
      res.json(products)
  }

  const handleShipping = async(req, res, shipping)=>{
    let prodcuts = await Product.find({
      shipping
    })
    .populate('category','_id name')
    .populate('subCategory','_id name')
    .populate('postedBy', '_id name')
    .exec()  
    res.json(prodcuts)
  }

  exports.searchFilters= async (req,res) =>{
       const { query, price, category, stars, subCategory,brand , color,shipping } = req.body

       if(query){ console.log('query', query);
        await handleQuery(req,res,query)
       }

       if(price !== undefined){ console.log('price', price);
        await handlePrice(req, res, price)
       }

       if(category){
        await handleCategory(req, res, category)
       }

       if(stars){
        await handleStar(req, res, stars)
       }

       if(subCategory){
        await handleSubCategory(req, res,subCategory)
       }
       if(brand){
        await handleBrand(req, res, brand)
       }

       if(color){
        await handleColor(req, res, color)
       }

       if(shipping){
        await handleShipping(req, res, shipping)
       }
  }

  