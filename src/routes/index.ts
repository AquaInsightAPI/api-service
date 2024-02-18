import {Router} from 'express';
import LakesRoute from './lakes';
const routes = Router();

routes.use('/lake',LakesRoute);

export default routes;