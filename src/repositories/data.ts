import Data from '../models/data';

class DataRepository{
    private model=Data;
    private maxDocuments:number;

    setMaxDocument(maxDocuments:number){
        this.maxDocuments=maxDocuments;
    }

    async getParameterDataOfLake(lake_name:string,parameter_name:string){
        const data = await this.model.find({
            lake_name:lake_name,
            parameter_name:parameter_name,
        }).limit(this.maxDocuments);
        console.log(data.length);
        return data;
    }

    async getParameterDataOfLakeInDateRange(lake_name:string,parameter_name:string,date:any){
        const data = await this.model.find({
            lake_name:lake_name,
            parameter_name:parameter_name,
            date: {$gte:new Date(date.startDate),$lte:new Date(date.endDate)}
        }).limit(this.maxDocuments);
        console.log(data.length);
        return data;
    }


    async getParameterDataOfLakeForYear(lake_name:string,parameter_name:string,year:number){
        const startOfYear = `${year}-01-01`;
        const endOfYear = `${year}-12-31`;

        const data = await this.model.find({
            lake_name:lake_name,
            parameter_name:parameter_name,
            // date: { $gte: startOfYear, $lte: endOfYear }
            date: {$gte:new Date(startOfYear),$lte:new Date(endOfYear)}
        }).limit(this.maxDocuments);
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