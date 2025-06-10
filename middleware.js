const Listing=require("./model/listing")
const Review = require("./model/review");
const {ListingSchema}=require("./schema");
const {ReviewSchema}=require("./schema");

module.exports.isloggedIn=(req,res,next)=>{
      if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
         req.flash("error","you can first Login/signup")
        return res.redirect("/login")
    }else{
        next()
    }
}

module.exports.isSaveLogged=(req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirect=req.session.redirectUrl
    }
    next()
}

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let data= await Listing.findById(id);
   if(!res.locals.currUser._id.equals(data.owner)){
           req.flash("error","you are not able to do anything")
        return res.redirect("/listings")
    }
    next()
}

module.exports.isAuth=async(req,res,next)=>{
    let{id,reviewId}=req.params
    let data=await Listing.findById(id)
    let dataReview= await Review.findById(reviewId);
      if (!dataReview.author.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not authorized to do that.");
      return res.redirect(`/listings/${id}`);
    }
    next()
}

module.exports.validateListing=(req,res,next)=>{
    let{error}=ListingSchema.validate(req.body)
    if(error){
     throw new ExpresErr(401,error.message)
    }else{
        next()
    }  
}
module.exports.validateReview=(req,res,next)=>{
    let{error}=ReviewSchema.validate(req.body)
    if(error){
        throw new ExpresErr(401,error.message)
    }else{
 next()
    }
}


