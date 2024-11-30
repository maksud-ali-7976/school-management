import express from "express";
const router = express.Router();
import { AuthMiddleware } from "../middleware/Auth.js";
import multer from "multer";

import {
  HandlerForStudentAdmission,
  HandlerForGettingAllStudents,
  HandlerForParticularStudent,
  HandlerForStudentDeleted,
  HandlerForUpdatingStudentInformation,
  HandlerForGettingFeesPaidStudent,
} from "../controllers/Student.js";
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'public/upload/')
  },
  filename:function(req,file,cb){
    cb(null,`${Date.now()}-${file.originalname}`)
  }
})

const upload =  multer({ storage: storage });
// console.log(storage.getDestination)

router.post(
  "/add-student",
  AuthMiddleware,
  upload.single("image"),
  HandlerForStudentAdmission
);
router.get("/all-student", AuthMiddleware, HandlerForGettingAllStudents);
router.get("/student/:id", AuthMiddleware, HandlerForParticularStudent);
router.delete("/delete-student/:id", AuthMiddleware, HandlerForStudentDeleted);
router.patch(
  "/update-student/:id",
  AuthMiddleware,
  HandlerForUpdatingStudentInformation
);
router.get("/paid-students", AuthMiddleware, HandlerForGettingFeesPaidStudent);

export default router;
