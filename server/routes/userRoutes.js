import express from "express";
import {
  userRegisterationController,
  allUserController,
  singleUserController,
} from "../controllers/userController.js";
import upload from "../multerConfig/storageConfig.js";

const router = new express.Router();

router.post(
  "/register",
  upload.single("profileImg"),
  userRegisterationController
);

router.get("/home", allUserController);

router.get("/profile/:id", singleUserController);

export default router;
