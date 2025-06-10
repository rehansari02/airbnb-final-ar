const mongoose = require('mongoose');
const Review = require('./review');
const { ListingSchema } = require('../schema');
let Schema=mongoose.Schema;
let model=mongoose.model;

const listingSchema= new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    image:{
          url:String,
          filename:String
        },
    location:{
        type:String
    },
    country:{
        type:String
    },
     reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
     ],
     owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
     }
})

listingSchema.post("findOneAndDelete",async(data)=>{
    if(data){
       await Review.deleteMany({id:{$in:[data.reviews.id]}})
    }
})

let Listing= model("Listing",listingSchema);

module.exports=Listing
