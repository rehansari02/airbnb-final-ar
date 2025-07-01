const User= require("../model/user");
const Listing=require("../model/listing");


module.exports.renderUser=(req,res,next)=>{
    res.render("users/signup.ejs")
}

module.exports.userForm=async(req,res,next)=>{
    try{
let {email,username,password}=req.body;
let data=new User({email,username});
   await  User.register(data,password);
   req.login(data,(error)=>{
          if(error)next(error)
     req.flash("sucess","Welcome to Wanderlust")
   res.redirect("/listings")
   })
    } catch(error){
        req.flash("error",error.message);
        res.redirect("/listings");
    }
}


module.exports.renderLogin=(req,res,next)=>{
    res.render("users/login.ejs")
}

module.exports.loginForm=async(req,res,next)=>{
      let redirectLink= res.locals.redirect || "/listings"
     req.flash("sucess","welcomeBack to Wanderlust");
      res.redirect(redirectLink);
}

module.exports.logout=async(req,res,next)=>{
req.logout((error)=>{
    if(error)next(error);
    req.flash("sucess","logout sucessfull");
    res.redirect("/listings")
})
}


module.exports.Searching=async (req, res, next) => {
  const term = req.query.term;
  if (!term) {
    return res.json([]); // no error, just empty
  }
  const listings = await Listing.find({
    title: { $regex: term, $options: "i" } // case-insensitive match
  }).select("title _id"); // only send what's needed

  res.json(listings); // frontend expects JSON
}


module.exports.profileRender=async(req,res,next)=>{
  let id=req.user.id
  let data= await Listing.find({owner:id}).populate("owner")
  if(data.length===0){
    req.flash("error","you haven't uploaded anything yet!")
    return res.redirect("/listings")
  }
   res.render("users/profile.ejs",{data})
}