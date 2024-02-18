import { Request,Response } from 'express';

export const pingCheck=(req:Request, res:Response)=>{
    return res.json({message: 'Ok from /api routes'});
}