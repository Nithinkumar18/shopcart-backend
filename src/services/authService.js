import User from "../models/user.js";
import Joi from "Joi";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import AppError from "../utils/AppError.js";
import httpMessages from "../constants/httpResponses.js";
import jwt from "jsonwebtoken";

dotenv.config();

async function register(userData) {

    try {

        const validatedData = validateInputData(userData);

        if (validatedData.error) {
            throw new AppError(validatedData.error.message);
        }
        const userEmail = validatedData.value.email;

        const checkEmailUniqueNess = await User.findOne({ email: userEmail });

        if (checkEmailUniqueNess !== null) {
            throw new AppError(httpMessages.USER_EMAIL_DUPLICATE);

        }
        const preEncryptPassword = validatedData.value.password;

        const postEncryptPassword = await encryptUserPassword(preEncryptPassword);

        const postValidationUserData = { ...userData, password: postEncryptPassword };

        const userRecord = await User.create(postValidationUserData);

        return userRecord;


    }
    catch (err) {
        throw new Error(err);
    }

}


async function login(uemail,upass) {

    try{
       
        const userToValidate = await User.findOne({email:uemail});
        if(userToValidate === null) return null;
        const validatePassword = await bcrypt.compare(upass,userToValidate.password);
        if(validatePassword){
           const {email,role} = userToValidate;
            const token =  jwt.sign({email,role},process.env.APP_WEB_SECRET,{expiresIn:'15m'});
            return token;
        }
        else{
            return false;
        }


    }
    catch(err){
        throw new AppError(err);
    }
    
}

const validateInputData = (data) => {

    const schemaValidation = Joi.object({

        name: Joi.string().min(5).max(25).required().trim(true).messages({
            "string.empty": "Name field is required",
            "string.min": "Name should contain at least 5 characters",
            "string.max": "Name should not exceed 25 characters"
        }),
        email: Joi.string().email().required().lowercase(true).messages({
            "string.empty": "Email field is required",
            "string.email": "Invalid email format"
        }),
        password: Joi.string().required().min(8).messages({
            "string.empty": "Password field is required",
            "string.min": "Password should contain at least 8 characters"
        }),
        role: Joi.string().required(),
        avatar: Joi.string().optional(),
        isVerified: Joi.boolean().required()

    }).options({ abortEarly: false });

    return schemaValidation.validate(data);


}

const encryptUserPassword = async (pwd) => {

    try {
        const hashedPassword = await bcrypt.hash(pwd, Number(process.env.BCRYPT_HASHING_SALT_ROUNDS));
        return hashedPassword;
    }
    catch (err) {
        throw new AppError(err);
    }
}

const authenticationService = {
    register,
    login
}

export default authenticationService;