import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
export const newUser = TryCatch(async (req, res, _next) => {
    throw new Error("some error");
    const { name, _id, email, photo, gender, dob } = req.body;
    const user = await User.create({
        name,
        _id,
        email,
        photo,
        gender,
        dob: new Date(dob),
    });
    res.status(200).json({
        success: true,
        message: `Welcome,${user.name}`,
    });
});
