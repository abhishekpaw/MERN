import { create } from "domain";
import { Request,Response,NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
import { error } from "console";

export const newUser = TryCatch(
    async(req:Request<{},{},NewUserRequestBody>,res:Response,_next:NextFunction) => {
        throw new Error("some error");
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
    }
);