const mongoose = require('mongoose');
let Schema=mongoose.Schema;
let model=mongoose.model;

const ReviewSchema=new Schema({
    rating:{
        type:Number
    },
    comment:{
        type:String
    },
    created_at:{
        type:Date,
        default:new Date()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

let Review =model("Review",ReviewSchema);
module.exports=Review

