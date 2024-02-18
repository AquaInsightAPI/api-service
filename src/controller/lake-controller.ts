import {StatusCodes} from 'http-status-codes';
import DataService from '../services/data-service';
import {SuccesResponse,ErrorResponse} from  '../utils/common/api-response';
import { Request,Response } from 'express';
const dataService = new DataService();


async function getParameterDataOfLake(req:Request, res:Response){
    try{
        const userPlan=(req as any).user.plan;  
        const date = {startDate:'',endDate:''};
        const lakeData = await dataService.getParameterDataOfLake({
            lake_name: req.params.lake_name,
            parameter_name: req.params.parameter_name,
            userPlan:userPlan,
            date:date
        });
        const succesResponse = SuccesResponse(lakeData,userPlan);

        return res
                .status(StatusCodes.OK)
                .json(succesResponse);
        
    }catch(error:any){
        const errorResponse = ErrorResponse(error);
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
} 

async function getParameterDataOfLakeInDateRange(req:Request, res:Response){
    try{  
        const userPlan=(req as any).user.plan; 
        const date = {startDate:req.params.startDate,endDate:req.params.endDate};
        const lakeData = await dataService.getParameterDataOfLakeInDateRange({
            lake_name: req.params.lake_name,
            parameter_name: req.params.parameter_name,
            userPlan:userPlan,
            date:date
        });
        const succesResponse = SuccesResponse(lakeData,userPlan);

        return res
                .status(StatusCodes.OK)
                .json(succesResponse);
    }catch(error:any){
        const errorResponse = ErrorResponse(error);
        return res
            .status(error.statusCode)
            .json(errorResponse);
    }
}

export{
    getParameterDataOfLake,
    getParameterDataOfLakeInDateRange
}
