import express from "express";
import {
  userRegisterationController,
  allUserController,
  singleUserController,
  userEditController,
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

router.put("/edit/:id", upload.single("profileImg"), userEditController);

export default router;
