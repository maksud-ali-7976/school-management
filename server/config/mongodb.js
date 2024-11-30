import mongoose from "mongoose";

export  const ConnectToMongoDb  = (uri)=>{
    return mongoose.connect(uri)
}
