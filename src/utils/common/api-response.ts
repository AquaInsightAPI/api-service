function createResponse(success:boolean, message:string,data:any, error:any,meta:any){
    return {
        success: success,
        message: message,
        data: data,
        error: error,
        meta:meta
    };
}

export function ErrorResponse(error:any,meta:any={}){
    return createResponse(false,'Something went wrong',{},error,meta);
}

export function SuccesResponse(data:any,userPlan:any={}){
    if(userPlan==='free'){
        const meta={
            plan:'free',
            info:'The Free Plan includes an access limit of 100 rows per request',
            userName:'test user'
        }
        return createResponse(true,'Successfully completed the request',data,{},meta);
    }
    const meta={
        plan:'pro',
        info:'Our Paid Plans offer a robust access limit of 10,000 rows per request',
        userName:'test user'
    }
    return createResponse(true,'Successfully completed the request',data,{},meta);
}