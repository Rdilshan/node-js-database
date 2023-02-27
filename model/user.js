const mongoose = require("mongoose")

const newuser = new mongoose.Schema({
    fullname:String,
    email :String,
    username:String,
    passward:String

})

module.exports = mongoose.model("user",newuser);
