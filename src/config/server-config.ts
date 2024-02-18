const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';    
export const DATABASE_NAME = process.env.DATABASE_NAME;