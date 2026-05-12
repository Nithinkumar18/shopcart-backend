import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const CONNECTION_URL = process.env.MONGODB_URI;




async function connectToDB(){
    try{

        await  mongoose.connect(CONNECTION_URL,{})
        console.log("connected")
        
    }
    catch(err){
        throw  Error(err);
        
    }
    
}

export default connectToDB;