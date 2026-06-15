import bcrypt from "bcrypt";
import { SALT_ROUND } from "../../../config/config.service.js";
import { usersModel } from "../../DB/model/user.model.js";
export const getUserProfile = async (user) => {
  return user;
};
export const changePassword = async (req, res, next) => {
  const { oldPassword, password } = req.body;
  try {
    const comparePassword = await bcrypt.compare(
      oldPassword,
      req.user.password,
    );
    if (!comparePassword) {
      return next(
        new Error("password dosenot match old password", { cause: 400 }),
      );
    }
    const hashNewPassword = await bcrypt.hash(password, SALT_ROUND);
    const user = await usersModel.findByIdAndUpdate(
      req.user._id,
      { password: hashNewPassword },
      { new: true },
    );
    // req.user.password = hashNewPassword;
    // await req.user.save();
  } catch (error) {
    return next(error);
  }
};
