import httpStatusConstants from '../constants/httpConstants.js'
import httpMessages from '../constants/httpResponses.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const validateToken = async(req,res,next) => {
    try{
      
        const extractedToken = req.headers.authorization;
        if(!extractedToken || !extractedToken.startsWith("Bearer")){
            return res.status(httpStatusConstants.BAD_REQUEST).json({status:httpMessages.TOKEN_VALIDATION_FAIL,message:httpMessages.TOKEN_UNDEFINED});
        }

        const token  = extractedToken.split(' ')[1];
        const verifyToken = jwt.verify(token,process.env.APP_WEB_SECRET);
        req.role = verifyToken.role;
        next();
    }
    catch(err){
       return res.status(httpStatusConstants.UNAUTHORIZED).json({status:httpMessages.TOKEN_VALIDATION_FAIL,message:httpMessages.TOKEN_EXPIRED});
    }
}

export default validateToken;