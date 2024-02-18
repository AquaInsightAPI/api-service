import Data from '../models/data';

class DataRepository{
    private model=Data;
    private maxDocuments:number;
    private startDate:string;
    private endDate:string;

    setStartAndEndDate(startDate:string, endDate:string){
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
    setMaxDocument(maxDocuments:number){
        this.maxDocuments=maxDocuments;
    }

    async getParameterDataOfLake(lake_name:string,parameter_name:string){
        const data = await this.model.find({
            lake_name:lake_name,
            parameter_name:parameter_name,
        }).limit(this.maxDocuments);
        return data;
    }

    async getParameterDataOfLakeInDateRange(lake_name:string,parameter_name:string){
        console.log(this.startDate)
        console.log(this.endDate)
        const data = await this.model.find({
            lake_name:lake_name,
            parameter_name:parameter_name,
            date: {$gte:new Date(this.startDate),$lte:new Date(this.endDate)}
        }).limit(this.maxDocuments);
        console.log(data.length);
        return data;
    }


    async getParameterDataOfLakeForYear(lake_name:string,parameter_name:string){

        const data = await this.model.find({
            lake_name:lake_name,
            parameter_name:parameter_name,
            date: {$gte:new Date(this.startDate),$lte:new Date(this.endDate)}
        });
        return data;

    }

    async getAllDataOfLakeInDateRange(lake_name:string,date:any){
        const data = await this.model.find({
            lake_name:lake_name,
            date: { $gte: date.start, $lte: date.end }
        }).limit(this.maxDocuments);
        return data;
    }

    
    async getAllDataOfLake(lake_name:string){
        const data = await this.model.find({
            lake_name:lake_name,
        }).limit(this.maxDocuments);
        return data;
    }
}

export default DataRepository;