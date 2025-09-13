import express from "express";
import { userRegisterationController } from "../controllers/userController.js";
import upload from "../multerConfig/storageConfig.js";

const router = new express.Router();

router.post(
  "/register",
  upload.single("profileImg"),
  userRegisterationController
);

export default router;
