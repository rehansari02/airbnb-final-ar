const mongoose = require('mongoose');
let Schema=mongoose.Schema;
let model=mongoose.model;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema=new Schema({
    email:{
        type:String
    }
})

UserSchema.plugin(passportLocalMongoose);

let User=model("User",UserSchema);

module.exports=User
