import {StatusCodes} from 'http-status-codes';
import AppError from '../utils/common/app-error';
import DataRepository from '../repositories/data';
import {Helper,Common} from '../utils';

type DateType = {
    startDate:string,
    endDate:string
}
type queryDataType = {
    lake_name:string,
    parameter_name:string,
    userPlan:string,
    date:DateType
}

class DataService{
    private dataRepository:DataRepository;
    constructor(){
        this.dataRepository = new DataRepository();
    }

    async getParameterDataOfLake(data:queryDataType){
        try{
            this.setMaxDocument(data.userPlan);
            const lakeData = await this.dataRepository.getParameterDataOfLake(data.lake_name,data.parameter_name);
            return lakeData;
        }catch(error){
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getParameterDataOfLakeInDateRange(data:queryDataType){
        try{
            const modifiedDateFormat = this.convertDateFormat(data.date);
            const lakeData = await this.dataRepository.getParameterDataOfLakeInDateRange(
                data.lake_name,
                data.parameter_name,
                modifiedDateFormat
            );
            return lakeData;
        }catch(error){

        }
    }

    // async getParameterDataOfLakeForYear({ data }: { data: queryDataType; }){
    //     try{
    //         const lakeData = await this.dataRepository.getParameterDataOfLakeForYear(data.lake_name,data.parameter_name);
    //         return lakeData;
    //     }catch(error){
    //         throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async getAllDataOfLake(data:queryDataType){
        try{
            const lakeData = await this.dataRepository.getAllDataOfLake(data.lake_name);
            return lakeData;
        }catch(error){
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    convertDateFormat(date:DateType){
        const convertedStartDate = Helper.convertDateFormat(date.startDate);
        const convertedEndDate = Helper.convertDateFormat(date.endDate);
        return {
            startDate: convertedStartDate,
            endDate: convertedEndDate
        };
    }

    isDateValidForFreePlan(date:any):boolean{
        const currentDate = new Date();
        const inputDateObject = new Date(date);
        const adjustedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2);
        if(inputDateObject>=adjustedCurrentDate) return false;
        return true;
    }

    setMaxDocument(userPlan:string){
        if(userPlan==='free'){
            this.dataRepository.setMaxDocument(Common.Constants.maxDocumentsPlan.FREE_PLAN_MAX_DOCUMENTS);
        }else{
            this.dataRepository.setMaxDocument(Common.Constants.maxDocumentsPlan.PRO_PLAN_MAX_DOCUMENTS);
        }
    }
}

export default DataService;