import express from "express";
const router = express.Router();
import multer from "multer";
import { AuthMiddleware } from "../middleware/Auth.js";
import cloudinary from "../config/cloudnery.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  HandlerForTeacherAdd,
  HandlerForGettingAllTeacher,
  HandlerForTeacherEditInformation,
  HandlerForDeleteTeacher,
  HandlerFroTeachersUpdate,
} from "../controllers/Teachers.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "upload",
    format: async (req, res) => "jpeg",
    public_id: async (req, file) =>
      `${Date.now()}-${req.file.originalname.split(".")[0]}`,
  },
});

const upload = multer({ storage: storage });
router.use(express.static("public/teacher"));
router.post(
  "/add-teacher",
  AuthMiddleware,
  upload.single("image"),
  HandlerForTeacherAdd
);
router.get("/all-teacher", AuthMiddleware, HandlerForGettingAllTeacher);

router.get(
  "/edit-teacher/:id",
  AuthMiddleware,
  HandlerForTeacherEditInformation
);

router.delete("/teacher-delete/:id", AuthMiddleware, HandlerForDeleteTeacher);
router.patch("/teacher-update/:id", AuthMiddleware, HandlerFroTeachersUpdate);
export default router;
