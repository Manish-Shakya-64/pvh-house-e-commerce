const mongoose = require("mongoose");



const categorySchema = new mongoose.Schema({
    name : {type:String,required:[true,'Please Enter category']}
},{timestamps:true})

module.exports =  mongoose.model('Category',categorySchema);