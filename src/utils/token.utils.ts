import {UserService} from '../services';

const userService = new UserService();

export const verifySecretKey = async (secretKey: string)=>{
    const userDetails = await userService.getUser({secretKey: secretKey});
    return userDetails;
}