import {Request, Response,NextFunction } from "express";

export interface NewUserRequestBody{
    name:string;  
    _id:string; 
    email: string;
    photo: string;
    gender: string;
    dob: Date;  
}

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;