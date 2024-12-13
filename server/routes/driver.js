import { Router } from "express";
const router = Router();
import cloudinary from "../config/cloudnery.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  HandlerForAddDriver,
  HandlerForAllDriver,
  HandlerForDeleteDriver,
  HandlerForDriverUpdate,
  HandlerForFindParticularDriver,
} from "../controllers/Driver.js";

import { AuthMiddleware } from "../middleware/Auth.js";
import multer from "multer";
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "upload",
    format: async (req, res) => "jpeg",
    public_id: async (req, file) => `${Date.now()}-${file.originalname}`,
  },
});
const upload = multer({ storage: storage });
router.post(
  "/add-driver",
  AuthMiddleware,
  upload.single("image"),
  HandlerForAddDriver
);
router.get("/all-driver", AuthMiddleware, HandlerForAllDriver);
router.get("/driver/:id", AuthMiddleware, HandlerForFindParticularDriver);
router.delete("/delete-driver/:id", AuthMiddleware, HandlerForDeleteDriver);
router.patch("/update-driver/:id", AuthMiddleware, HandlerForDriverUpdate);

export default router;
