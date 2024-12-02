import express from "express";
const router = express.Router();
import multer from "multer";
import { AuthMiddleware } from "../middleware/Auth.js";
import {
  HandlerForTeacherAdd,
  HandlerForGettingAllTeacher,
  HandlerForTeacherEditInformation,
  HandlerForDeleteTeacher,
  HandlerFroTeachersUpdate,
} from "../controllers/Teachers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/teacher");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
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
