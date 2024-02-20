import { Request,Response } from 'express';

const pingCheck = (req:Request, res:Response)=>{
    return res.status(200).json({message: 'Ok from /api routes'});
}
export default pingCheck;