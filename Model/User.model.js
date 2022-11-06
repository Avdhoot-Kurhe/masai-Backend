const mongoose = require('mongoose');


const userSchema  = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
})
const UserModel = mongoose.model("client",userSchema)

module.exports = {
 UserModel
}