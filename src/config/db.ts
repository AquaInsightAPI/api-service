import mongoose from 'mongoose';
import {DATABASE_NAME, MONGODB_URI} from './server-config';

const dbConnect = async () => {
    try{
        const connection = await mongoose.connect(MONGODB_URI,{dbName: DATABASE_NAME});
        console.info(`Connected to database sucessfully ${connection.connection.host}`);
    }catch(error){
        console.error('Error occured while connecting' +error);
        process.exit(1);
    }
}
export default dbConnect;