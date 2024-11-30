import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    }
},{timestamps:true})


 const User = mongoose.model('user',UserSchema);

 export default User;