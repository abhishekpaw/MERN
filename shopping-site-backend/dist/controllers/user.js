import { User } from "../models/user.js";
export const newUser = async (req, res, next) => {
    try {
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error,
        });
    }
};
