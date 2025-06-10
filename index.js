const express=require("express");
const app=express();
const path=require("path");
const port=8080;

const mongoose = require('mongoose');

const User= require("./model/user");

var methodOverride = require('method-override')
const  engine = require('ejs-mate')
const passport = require('passport');
const LocalStrategy = require('passport-local')
var session = require('express-session')
const MongoStore = require('connect-mongo');
var flash = require('connect-flash');


const ExpresErr=require("./utils/ExpressErr")





const ListingRoutes=require("./routes/listing")
const ReviewRoutes=require("./routes/review")
const UserRoutes=require("./routes/user")


app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'))
app.engine('ejs', engine);





 let store=MongoStore.create({
       mongoUrl:process.env.ATLASDB_URL,
     secret:process.env.SECRET,
      touchAfter:24*3600
 })



store.on("error", (err) => {
  console.log("There was an error in session store:", err);
});


let Sessiondata={
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
   }
}



app.use(session(Sessiondata))
 app.use(flash());



 app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





let MONGOURL=process.env.ATLASDB_URL

main()
.then(()=>{
    console.log("the mongoose has also worked")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGOURL);
}




app.use((req,res,next)=>{
    res.locals.sucess=req.flash("sucess");
      res.locals.errorMsg=req.flash("error");
      res.locals.currUser=req.user;
    next()
})



// port
app.listen(port,()=>{
    console.log("the server get on work");
})




app.use("/listings",ListingRoutes)
app.use("/listings/:id/reviews",ReviewRoutes)
app.use("/",UserRoutes)



app.get("/",(req,res,next)=>{
  res.redirect("/listings")
})




app.use((req,res,next)=>{
   next( new ExpresErr(404,"Page not Found"))
    
})


// error handle
app.use((err,req,res,next)=>{
  let{status=500,message="something went wrong"}=err
  res.status(status).render("listings/error.ejs",{message})
})




