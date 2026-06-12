import { usersModel } from "../../DB/model/index.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  SALT_ROUND,
  USER_SECRET_KEY,
  ADMIN_SECRET_KEY,
} from "../../../config/config.service.js";
import { rolesTypes } from "../../middlewares/auth.middle.js";

//* signup logic
export const signup = async (data) => {
  const { email, password, role, DOB, gender, age } = data;
  const checkEmail = await usersModel.findOne({ email });
  if (checkEmail) {
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
  const user = await usersModel.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};
//* login logic
export const login = async (props) => {
  const { email, password } = props;
  const user = await usersModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    { id: user._id },
    user.role === rolesTypes.user ? USER_SECRET_KEY : ADMIN_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );

  return token;
};
