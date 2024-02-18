import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        // this will be used to validate api Id 
        _id:{
            type:mongoose.Types.ObjectId,
            required:true,
        },
        plan:{
            type:String,
            enum:['free','pro'],
            default:'free',
            required:true,
        },
    },
    {collection:'users'}
);

const Users = mongoose.model('users', userSchema);

export default Users;