import Users from '../models/users';

class UsersRepository{
    model=Users;
    // constructor(){
    //     // this.model = model;
    // }
    async getUser(secretKey:string){
        const user = await this.model.findOne({
            _id:secretKey
        });
        return user;
    }
}

export default UsersRepository;