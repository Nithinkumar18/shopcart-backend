import httpStatusConstants from  '../constants/httpConstants.js';
import httpMessages from "../constants/httpResponses.js"
import AppError from "../utils/AppError.js";

const authorizeUserRole = (validRoles) => {

    return(req,res,next) => {
        try{
          
            const role = req.role;
            if(validRoles.includes(role)){
                next();
            }
            else{
                return res.status(httpStatusConstants.UNAUTHORIZED).json({message:httpMessages.ACCESS_DENIED});
            }
        }
        catch(err){
            throw new AppError(httpMessages.ERROR_VALIDATING_ROLE);
            
        }
    }

}

export default authorizeUserRole;