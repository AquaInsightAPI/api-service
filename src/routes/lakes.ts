import {Router} from 'express';

import {
    getParameterDataOfLake,
    getParameterDataOfLakeInDateRange,
    getParameterDataOfLakeForYear
} from '../controller/lake-controller';

import {valdiateSecretKey} from '../validators/authenticate.validators';
const routes = Router();

routes.get('/:lake_name/parameter/:parameter_name/date/:startDate/:endDate',valdiateSecretKey,getParameterDataOfLakeInDateRange);
routes.get('/:lake_name/parameter/:parameter_name/:year',valdiateSecretKey,getParameterDataOfLakeForYear);
routes.get('/:lake_name/parameter/:parameter_name',valdiateSecretKey,getParameterDataOfLake);

export default routes;