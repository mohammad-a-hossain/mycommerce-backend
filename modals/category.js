const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'name is required',
        minlength:[3,'too short'],
        maxlength:[30, 'too much'],

    },
    slug:{
        type:String,
        slug:this.name,
        unique:true,
        lowercase:true,
        index:true,
    },

},
{ timestamps:true} )

module.exports = mongoose.model("Category", categorySchema)