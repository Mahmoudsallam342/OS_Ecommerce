import jwt from "jsonwebtoken";
import {
  ADMIN_SECRET_KEY,
  USER_SECRET_KEY,
} from "../../config/config.service.js";
import { usersModel } from "../DB/model/index.js";
export const rolesTypes = {
  user: "user",
  admin: "admin",
};
export const authhuntication = async (req, res, next) => {
  //   const { authorization } = req.headers;
  //   const token = req.headers.authorization;
  //   console.log({ authorization });
  try {
    const [Bearer, token] = req.headers.authorization.split(" ");
    let token_signature = undefined;
    switch (Bearer) {
      case "Bearer":
        token_signature = USER_SECRET_KEY;

        break;
      case "Amin":
        token_signature = ADMIN_SECRET_KEY;

        break;
      default:
        break;
    }
    const { id } = jwt.verify(token, token_signature);
    const user = await usersModel.findById(id);
    if (!user) {
      return res.status(401).json({
        message: "failed auth",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
      error,
    });
  }
};
export const authorization = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "unauthorized" });
      }
    } catch (error) {
      res.json({ message: "forbidden user" }, error);
    }
  };
};
