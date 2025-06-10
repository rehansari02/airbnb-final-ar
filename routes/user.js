const express=require("express");
const router = express.Router();

const User= require("../model/user");
const AsyncWrap=require("../utils/asynWrap")

const {isSaveLogged, isloggedIn}=require("../middleware")
const passport = require('passport');
const { renderUser, userForm, renderLogin, loginForm, logout, Searching, profileRender } = require("../controller/user");





router.route('/signup')
.get(renderUser)
.post(AsyncWrap(userForm))

// user login

router.route('/login')
.get(renderLogin)
.post(isSaveLogged,passport.authenticate("local",
    {
        failureRedirect:"/login",
        failureFlash:true
    }
),AsyncWrap(loginForm))

// user logout
router.get("/logout",logout)

router.get("/search", Searching);


router.get("/profile",isloggedIn,profileRender)



module.exports=router