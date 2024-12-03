import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import express from "express";
import cors from "cors";
const app = express();
import UserRoutes from "./routes/user.js";
import StudentsRoute from "./routes/Students.js";
import teacherRoute from "./routes/Teachers.js";
import { ConnectToMongoDb } from "./config/mongodb.js";
import cookieParser from "cookie-parser";

ConnectToMongoDb(process.env.MONGO_URI)
  .then(() => console.log("mongodb Connected"))
  .catch((e) => console.log(e));

app.use(
  cors({
    origin: "https://school-management-six-liard.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "public/upload")));
app.use("/teachers", express.static(path.join(__dirname, "public/teacher")));
const PORT = process.env.PORT || 5000;

app.use("/user", UserRoutes);
app.use("/student", StudentsRoute);
app.use("/teacher", teacherRoute);

app.listen(PORT, () => {
  console.log("server running on  " + PORT);
});
