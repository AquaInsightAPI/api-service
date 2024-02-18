import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema(
    {
        _id:{
            type:mongoose.Types.ObjectId,
        },
        date:{
            type:Date
        },
        data:{
            type:Number,
        },
        parameter_name:{
            type:String,
            enum:['chlorophyl','turbidity','salinity','dissolved','oxygen','ph']		 	
        },
        lake_name:{
            type:String,
            enum:['upper_lake']		 	
        }
    },
    {
        collection:'upper_lake_data'
    }
)

const Data = mongoose.model('upper_lake_data',dataSchema);

export default Data;