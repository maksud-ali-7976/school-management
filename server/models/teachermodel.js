import { model, Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    salaryStatus: {
      type: Boolean,
      default: false,
    },
    subject: {
      type: String,
    },
  },
  { timestamps: true }
);


 export const Teacher = model('teacher',teacherSchema);

