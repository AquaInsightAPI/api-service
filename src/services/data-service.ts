import {StatusCodes} from 'http-status-codes';
import AppError from '../utils/common/app-error';
import DataRepository from '../repositories/data';
import {Helper,Common,Types} from '../utils';


class DataService{
    private dataRepository:DataRepository;
    private userPlan:string;
    constructor(){
        this.dataRepository = new DataRepository();
    }

    async getParameterDataOfLake(data:Types.QueryDataType){
        try{
            this.setMaxDocument(data.userPlan);
            this.setStartAndEndDate(data.date);
            const lakeData = await this.dataRepository.getParameterDataOfLake(data.lake_name,data.parameter_name);
            return lakeData;
        }catch(error){
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getParameterDataOfLakeInDateRange(data:Types.QueryDataType){
        try{
            this.setMaxDocument(data.userPlan);
            const modifiedDateFormat = this.convertDateFormat(data.date);
            this.setStartAndEndDate(modifiedDateFormat);
            const lakeData = await this.dataRepository.getParameterDataOfLakeInDateRange(
                data.lake_name,
                data.parameter_name
            );
            return lakeData;
        }catch(error){
            if(error instanceof Common.AppError){
                throw new Common.AppError(error.statusCode, error.explanation);
            }
            throw new Common.AppError(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getParameterDataOfLakeForYear(data: Types.QueryDataType){
        try{
            if(data.userPlan==='free'){
                throw new Common.AppError(StatusCodes.FORBIDDEN,'Forbidden: Free plan cannot access this data')
            }

            this.setStartAndEndDate(
                {
                    startDate:`${data.year}-01-01`,
                    endDate:`${data.year}-12-31`
                }
            )

            const lakeData = await this.dataRepository.getParameterDataOfLakeForYear(data.lake_name,data.parameter_name);
            return lakeData;
            
        }catch(error:any){
            if(error instanceof Common.AppError){
                throw new Common.AppError(error.statusCode,error.explanation)
            }
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllDataOfLake(data:Types.QueryDataType){
        try{
            const lakeData = await this.dataRepository.getAllDataOfLake(data.lake_name);
            return lakeData;
        }catch(error){
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    convertDateFormat(date:Types.DateType){
        const convertedStartDate = Helper.convertDateFormat(date.startDate);
        const convertedEndDate = Helper.convertDateFormat(date.endDate);
        return {
            startDate: convertedStartDate,
            endDate: convertedEndDate
        };
    }

    setMaxDocument(userPlan:string){
        this.userPlan=userPlan;
        if(userPlan==='free'){
            this.dataRepository.setMaxDocument(Common.Constants.maxDocumentsPlan.FREE_PLAN_MAX_DOCUMENTS);
        }else{
            this.dataRepository.setMaxDocument(Common.Constants.maxDocumentsPlan.PRO_PLAN_MAX_DOCUMENTS);
        }
    }

    setStartAndEndDate(date:Types.DateType){
        if(date.endDate===''){ 
            const {freePlanStartDateString} = Helper.getFreePlanStartDate();
            date.endDate = freePlanStartDateString;
        }

        if(Helper.compareTime(date.startDate,date.endDate)){
            throw new Common.AppError(StatusCodes.BAD_GATEWAY,'Invalid Date Range: The starting date must be before the end date');
        }

        if(this.userPlan==='free'){
            if(Helper.isDateInFreePlanAccessPeriod(date.startDate) || Helper.isDateInFreePlanAccessPeriod(date.endDate)){
                throw new Common.AppError(StatusCodes.FORBIDDEN,'Forbidden: Free plan cannot access this data');
            }
        }

        this.dataRepository.setStartAndEndDate(date.startDate,date.endDate);
    }
}

export default DataService;