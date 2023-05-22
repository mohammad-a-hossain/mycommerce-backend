

const User = require('../modals/user')


/* exports.createOrUpdateUser = async (req,res)=>{
       const {name,picture,email} = req.user 
       const user= await new User.findOneAndUpdate({email},{name,picture},{new: true})
       if(user){
        console.log('user is exist and will updat',user);
       }else{
        const newUser= await new User({
            name,
            email,
            picture,
        }).save()
        console.log('a new user created', newUser);
        res.json(newUser)
       }
} */

exports.createOrUpdateUser = async (req, res) => {
    try {
      const { email, name, picture } = req.user;
   
      const user = await User.findOneAndUpdate(
        { email },
        {
         name:email.split('@')[0],
          picture,
        },
        {
          new: true,
        }
      );
   
      if (user) {
        res.send(user);
        console.log('user is exist and will updat',user);
      } else {
        const newUser= await new User({
            name:email.split('@')[0],
            email,
            picture,
        }).save()
   
       
        res.send(user);
       // console.log('a new user created', newUser);
      }
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  }
 // module.exports = createOrUpdateUser


 exports.getCurrentUser= async(req,res)=>{
    User.findOne({email:req.user.email}).exec((err,user)=>{
        if(err) throw new Error(err)
        res.json(user)
    })

 }