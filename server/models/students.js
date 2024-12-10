import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentFather: {
      type: String,
      required: true,
    },
    studentClass: {
      type: String,
    },
    address: {
      type: String,
    },
    totalFess: {
      type: String,
    },
    phone: {
        type:String
    },
    profile:{
        type:String
    },
  },
  { timestamps: true }
);

const Students = mongoose.model("student", StudentSchema);

export default Students;
