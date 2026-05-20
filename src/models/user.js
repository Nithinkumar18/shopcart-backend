import mongoose from "mongoose";

 const  userSchema =  new mongoose.Schema({

    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password:{
        type: String,
        required: true,
        minlength: 8,
    },


    role:{
        type: String,
        required: true,
        enum: ["user","admin"]
    },

    avatar:{
        type: String
    },

    isVerified:{
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model("User",userSchema);
export default User;