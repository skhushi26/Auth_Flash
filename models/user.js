console.log("Welcome!!")

import {} from 'dotenv/config'
import mongoose from "mongoose";

const uri = process.env.MONGO_URI

mongoose.connect(uri,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(console.log("MongoDb Connected Successfully!!!"))
.catch((error)=>{
    console.log(error)
})

const userSchema = mongoose.Schema({
    name :{type:String,required:true},
    email :{type:String,required:true,unique:true},
    password : {type:String,required:true}
})

const userModel = mongoose.model("TapperUser",userSchema)

export default userModel