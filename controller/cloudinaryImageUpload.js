const cloudinary = require('cloudinary')



cloudinary.config({
  cloud_name: "dgmygpnj7",
  api_key: "975286456725992",
  api_secret: "RvaxUad6U8msdOa0H2SQayfl7ZI"

})

exports.uploadimage = async (req, res) => {
  
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
  
  
};





exports.remove =  (req, res) =>{

  let image_id = req.body.public_id

    cloudinary.uploader.destroy(image_id,(err, result)=>{
        if(err) return res.json({success:false, err})
        res.send('ok')
    })
}