const {StatusCodes} = require('http-status-codes')
const {SuccessResponse,ErrorResponse} = require('../utils/common')
const {UserService}= require('../services')

async function createUser(req,res){
    try {
          const user = await UserService.create({
            email: req.body.email,
            password: req.body.password
          })
          SuccessResponse.message="Successfully created a new user.";
          SuccessResponse.data = user;
          return res
                    .status(StatusCodes.CREATED)  
                    .json(SuccessResponse)      
    } catch (error) {
        ErrorResponse.message="Something went wrong.";
        ErrorResponse.error= error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)    
    }
}

async function signIn(req,res){
    try {
          const user = await UserService.signIn({
            email: req.body.email,
            password: req.body.password
          })
          SuccessResponse.message="Successfully Authenticated the User.";
          SuccessResponse.data = user;
          return res
                    .status(StatusCodes.ACCEPTED)  
                    .json(SuccessResponse)      
    } catch (error) {
        ErrorResponse.message="Something went wrong.";
        ErrorResponse.error= error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)    
    }
}

async function addRoleToUser(req,res){
  try {
        const user = await UserService.addRoleToUser({
          id: req.body.id,
          role: req.body.role
        })
        SuccessResponse.message="Successfully added Role to the User.";
        SuccessResponse.data = user;
        return res
                  .status(StatusCodes.ACCEPTED)  
                  .json(SuccessResponse)      
  } catch (error) {
      ErrorResponse.message="Something went wrong.";
      ErrorResponse.error= error;
      return res
                .status(error.statusCode)
                .json(ErrorResponse)    
  }
}

module.exports = {
    createUser,
    signIn,
    addRoleToUser
}