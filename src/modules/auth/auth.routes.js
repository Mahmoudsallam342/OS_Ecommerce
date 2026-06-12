import { Router } from "express";
import { login, signup } from "./auth.controller.js";

const router = Router();
//* signup routing
router.post("/signup", async (req, res, next) => {
  try {
    const result = await signup(req.body);

    return res
      .status(201)
      .json({ message: "data created successfully", result });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});
//* login routing
router.post("/login", async (req, res, next) => {
  try {
    const result = await login(req.body);

    return res.status(200).json({ message: "login done", result });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

export default router;
