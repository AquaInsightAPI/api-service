import {Router} from 'express';
import pingCheck from '../controller/ping.controller'
import LakesRoute from './lakes';
const routes = Router();

routes.get('/ping',pingCheck);
routes.use('/lake',LakesRoute);

export default routes;