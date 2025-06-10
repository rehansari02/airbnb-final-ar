const Review = require("../model/review");
const Listing=require("../model/listing")


module.exports.ReviewFrom=async(req,res,next)=>{
 let{id}=req.params
let data=await Listing.findById(id)
let newReview= new Review(req.body.review)
  data.reviews.push(newReview)
  newReview.author=req.user
  await newReview.save();
  await data.save();
     req.flash("sucess","New review Added")
  res.redirect(`/listings/${data.id}`)
}


module.exports.destroyReview=async(req,res,next)=>{
let{id,reviewId}=req.params
let data=await Listing.findByIdAndUpdate(id,{id:{$pull:{reviews:reviewId}}})
await Review.findByIdAndDelete(reviewId);
   req.flash("sucess","Review deleted successfull")
res.redirect(`/listings/${data.id}`)
}