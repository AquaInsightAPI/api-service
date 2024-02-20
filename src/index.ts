import app from './app';
import {ServerConfig,dbConnect} from './config';

app.listen(ServerConfig.PORT, () => {
    dbConnect()
    console.log(`Server started at PORT: ${ServerConfig.PORT}`);
});