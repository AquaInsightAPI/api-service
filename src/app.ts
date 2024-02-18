import express from 'express';
import ApiRoutes from './routes'
import {ServerConfig,dbConnect} from './config';

const app = express();

app.use('/api',ApiRoutes);

app.listen(ServerConfig.PORT, () =>{
  dbConnect();
  console.log(`Server is listening at http://localhost:${ServerConfig.PORT}`);
});