const express=require("express");
const router = express.Router({mergeParams:true});
const Review = require("../model/review");
const Listing=require("../model/listing")



const {isloggedIn,isAuth,validateReview}=require("../middleware")
const AsyncWrap=require("../utils/asynWrap");
const { ReviewFrom, destroyReview } = require("../controller/review");

// reviews



// review
router.post("/",isloggedIn,validateReview,AsyncWrap(ReviewFrom))


// review destroy
router.delete("/:reviewId",isloggedIn,isAuth,AsyncWrap(destroyReview))


module.exports=router