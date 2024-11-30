import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
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
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve("public")));
const PORT = process.env.PORT;

app.use("/user", UserRoutes);
app.use("/student", StudentsRoute);
app.use("/teacher", teacherRoute);

app.listen(PORT, () => {
  console.log("server running on  " + PORT);
});
