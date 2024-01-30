const AppError= require('../utils/errors/app-error')
const {StatusCodes} = require('http-status-codes');
const {UserRepository,RoleRepository} = require('../repositories');
const {Auth , Enums} = require('../utils/common');
const { STATUS_CODES } = require('http');
const role = require('../models/role');

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

async function create(data){
    try {
        const user = await userRepository.create(data);
        const role = await roleRepository.geRoleByName(Enums.USER_ROLES.CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name =='SequelizeUniqueConstraintError'){
            let explanation =[];
            error.errors.forEach((err) => {
                explanation.push(err.message);           
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new User Object.',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function signIn(data){
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No User found for the given email.', StatusCodes.NOT_FOUND)
        }
        const matchPassword = Auth.checkPassword(data.password, user.password);
        if(!matchPassword){
            throw new AppError('Invalid Password',StatusCodes.BAD_REQUEST);
        }
        const jwtToken = Auth.createToken({
            id: user.id,
            email: user.email
        });
        return jwtToken;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError("Something went wrong.",STATUS_CODES.INTERNAL_SERVER_ERROR);  
    } 
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing JWT token.',StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if(!user){
            throw new AppError('User not found.', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError'){
            throw new AppError('Invalid JWT token',StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError('JWT token has expired.',StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Something went wrong.",STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

}

module.exports ={
    create,
    signIn,
    isAuthenticated
}
