import {StatusCodes} from 'http-status-codes';
import AppError from '../utils/common/app-error';
import UserRepository from '../repositories/user';

class UserService{
    userRepository:UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    async getUser(data:any){
        try{
            const userData = await this.userRepository.getUser(data.secretKey);
            return userData;
        }catch(error){
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export default UserService;