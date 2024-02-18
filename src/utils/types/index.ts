interface IUser {
    id: string;
    plan: string;
}

namespace Express {
    interface Request {
        user: IUser;
    }
}

export type DateType = {
    startDate:string,
    endDate:string
}

export type QueryDataType = {
    lake_name:string,
    parameter_name:string,
    userPlan:string,
    date:DateType,
    year?:string
}