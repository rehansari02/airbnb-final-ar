const mongoose = require('mongoose');
const Listing=require("../model/listing");
const initData=require("./data");

main()
.then(()=>{
    console.log("the mongoose has also worked")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wander');
}

async function listingdata() {
      await Listing.deleteMany({})
  initData.listing= await initData.listing.map((obj)=>{
       return { ...obj, owner:"684742fb4526a5213b40ccd0"}
      })
    await Listing.insertMany(initData.listing)
}
listingdata()
