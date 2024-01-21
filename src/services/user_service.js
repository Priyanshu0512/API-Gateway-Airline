const AppError= require('../utils/errors/app-error')
const {StatusCodes} = require('http-status-codes');
const {UserRepository} = require('../repositories');
const {Auth} = require('../utils/common');
const { STATUS_CODES } = require('http');

const userRepository = new UserRepository();

async function create(data){
    try {
        const user = await userRepository.create(data);
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

module.exports ={
    create,
    signIn
}
