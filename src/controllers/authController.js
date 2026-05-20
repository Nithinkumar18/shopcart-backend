import authenticationService from "../services/authService.js";
import httpStatusConstants from "../constants/httpConstants.js";
import httpMessages from "../constants/httpResponses.js";

async function registerUser(req,res) {

    try{

        const data = req.body;
        const registeredUser = await authenticationService.register(data);
        if(registeredUser._id){
            return res.status(httpStatusConstants.CREATED).json({user_id:registeredUser._id,message:httpMessages.USER_REGISTRATION_SUCCESS});
        }
    }
    catch(err){
      
       
        return res.status(httpStatusConstants.BAD_REQUEST).json({status:httpMessages.USER_REGISTRATION_FAIL,message:err.message});
    }
    
}


async function loginUser(req,res) {

    try{
       
        const userEmail = req.body.email;
        const userPass  = req.body.password;
        const validUser = await authenticationService.login(userEmail,userPass);
        if(validUser === null ){
            return res.status(httpStatusConstants.UNAUTHORIZED).json({status:httpMessages.OPS_FAIL_STATUS,message:httpMessages.ACCOUNT_NOT_FOUND});
        }
        else if(validUser === false){
            return res.status(httpStatusConstants.UNAUTHORIZED).json({status:httpMessages.OPS_FAIL_STATUS,message:httpMessages.INVALID_PASSWORD});
        }
        else{
            return res.status(httpStatusConstants.SUCCESS).json({status:httpMessages.OPS_SUCCESS_STATUS,token:validUser});
        }

    }
    catch(err){
          return res.status(httpStatusConstants.INTERNAL_SERVER_ERROR).json({status:httpMessages.ERROR,message:err.message});
    }
    
}


const authController = {
    registerUser,
    loginUser
}

export default authController;