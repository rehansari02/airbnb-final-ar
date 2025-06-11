const Listing=require("../model/listing")


module.exports.allListing=async(req,res,next)=>{
    let data=await Listing.find({})
  res.render("listings/index.ejs",{data})
}

module.exports.renderformNew=async (req, res, next) => {
  return res.render("listings/new.ejs");
}


module.exports.newForm=async(req,res,next)=>{
    let url=req.file.path
    let filename=req.file.filename
    let data =new Listing(req.body.listing);
     data.owner=req.user
     data.image={url,filename}
    await data.save() 
    req.flash("sucess","New Listing Added")
    res.redirect("/listings");
}

module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params
    let data=await Listing.findById(id).populate(
        {
            path:"reviews",
            populate:{
                path:"author"
           }
}).populate("owner")
    if(!data){
        req.flash("error","Not result found")
       return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{data})
}

module.exports.renderupdate=async(req,res,next)=>{
    let {id}=req.params
    let data=await Listing.findById(id);
       if(!data){
        req.flash("error","Not result found")
       return res.redirect("/listings")
    }
    res.render("listings/edit.ejs",{data});
}


module.exports.formupdateList=async(req,res,next)=>{
    let {id}=req.params
    let data=await Listing.findByIdAndUpdate(id,{...req.body.listing},{runValidators:true});
    if(typeof req.file !== "undefined"){
     let url=req.file.path
    let filename=req.file.filename
       data.image={url,filename}
      await data.save()
    }
 
       req.flash("sucess","Edit on listing")
          if(!data){
        req.flash("error","Not result found")
       return res.redirect("/listings")
    }
     
     res.redirect( `/listings/${data.id}`)
}


module.exports.destroyListings=async(req,res,next)=>{
    let {id}=req.params
   let data= await Listing.findByIdAndDelete(id);
       req.flash("sucess","Listing deleted Succesfull")
     res.redirect( `/listings`)
}