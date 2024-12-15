import mongoose, { mongo, Schema } from "mongoose";
const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
    },
    profile: {
      type: String,
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const Driver = mongoose.model("driver", driverSchema);
