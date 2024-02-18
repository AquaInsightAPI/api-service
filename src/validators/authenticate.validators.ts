import {StatusCodes} from 'http-status-codes';
import {Request,Response,NextFunction} from 'express';
import {Common,TokenAuth} from '../utils'

async function valdiateSecretKey(req:Request,res:Response,next:NextFunction){

    if(!req.headers || !req.headers.secretkey){
        const errorResponse = Common.ApiResponse.ErrorResponse(
            new Common.AppError(
                StatusCodes.FORBIDDEN,
                'You\'re not authorised to do this operation'
            )
        )
        return res
            .status(StatusCodes.FORBIDDEN)
            .json(errorResponse);
    }
    
    const secretKey:string = req.headers.secretkey.toString();
    const userDetails = await TokenAuth.verifySecretKey(secretKey)

    if(!userDetails){
        const errorResponse = Common.ApiResponse.ErrorResponse(
            new Common.AppError(
                StatusCodes.FORBIDDEN,
                'You\'re not authorised to do this operation'
            )
        )
        return res
            .status(StatusCodes.FORBIDDEN)
            .json(errorResponse);
    }
    (req as any).user = userDetails;
    next();
}

export{
    valdiateSecretKey,
}

