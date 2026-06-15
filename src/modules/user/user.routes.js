import { Router } from "express";
import { changePassword, getUserProfile } from "./user.controller.js";
import {
  authorization,
  authuntication,
} from "../../middlewares/auth.middle.js";

const router = Router();

router.get(
  "/",
  authuntication,
  authorization(["admin", "user"]),
  async (req, res, next) => {
    try {
      const result = await getUserProfile(req.user);

      return res.status(200).json({
        message: "user profile",
        result,
      });
    } catch (error) {
      next(error);
    }
  },
);
router.patch(
  "/changePassword",
  authuntication,
  authorization(["user", "admin"]),

  changePassword,
);
export default router;
