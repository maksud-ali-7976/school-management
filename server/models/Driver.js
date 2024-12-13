import mongoose, { mongo } from "mongoose";
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
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Driver = mongoose.model("driver", driverSchema);
