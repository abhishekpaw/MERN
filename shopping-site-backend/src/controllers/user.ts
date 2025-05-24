import { create } from "domain";
import { Request,Response,NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";

export const newUser = async (req:Request<{},{},NewUserRequestBody>,res:Response,next:NextFunction)=>{

    try{
        const{ name,_id,email,photo,gender,dob} = req.body;

        const user = await User.create({
          name,
          _id,
          email,
          photo,
          gender,
          dob: new Date(dob),
        });

        res.status(200).json({
            success:true,
            message:`Welcome,${user.name}`,
        });
    }catch(error){
        res.status(400).json({
            success:false,
            message:error,
        });
    }


}