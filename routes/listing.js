if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}

const express=require("express");
const router = express.Router();

const multer  = require('multer')
const{storage}=require("../cloudconfig")
const upload = multer({ storage })

const Listing=require("../model/listing")
const AsyncWrap=require("../utils/asynWrap")
const ExpresErr=require("../utils/ExpressErr")





const {isloggedIn,isOwner,validateListing}=require("../middleware");
const { allListing, renderformNew, newForm, showListing, renderupdate, formupdateList, destroyListings } = require("../controller/listing");



// all listing
router.route("/")
.get(AsyncWrap(allListing))
.post(isloggedIn,upload.single("listing[image]"),validateListing,AsyncWrap(newForm))



// new listing added
router.route("/new")
.get(isloggedIn,renderformNew)


router.route("/:id")
// show
.get(AsyncWrap(showListing))
.put(isloggedIn,isOwner,upload.single("listing[image]"),validateListing,AsyncWrap(formupdateList))
.delete(isloggedIn,isOwner,AsyncWrap(destroyListings))

// edit
router.get("/:id/edit",isloggedIn,isOwner,AsyncWrap(renderupdate))

module.exports=router