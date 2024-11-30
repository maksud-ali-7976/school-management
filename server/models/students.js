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
    studentMother: {
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
    feesStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Students = mongoose.model("student", StudentSchema);

export default Students;
