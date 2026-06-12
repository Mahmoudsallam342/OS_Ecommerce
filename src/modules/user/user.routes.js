import { Router } from "express";
import { getUserProfile } from "./user.controller.js";
import {
  authhuntication,
  authorization,
} from "../../middlewares/auth.middle.js";

const router = Router();

router.get(
  "/",
  authhuntication,
  authorization(["admin"]),
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

export default router;
