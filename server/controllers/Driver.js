import { query } from "express";
import { Driver } from "../models/Driver.js";

export async function HandlerForAddDriver(req, res) {
  try {
    const profile = req.file.path;
    const { name, route, salary, vehicle } = req.body;
    const driverAdd = await Driver.create({
      name,
      route,
      salary,
      vehicle,
      profile,
    });
    return res
      .status(200)
      .json({ success: true, message: "driver Added Success" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}

export async function HandlerForAllDriver(req, res) {
  try {
    const { page = 1, limit = 10, search = "", route: route } = req.query;
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (route) {
      query.route = route;
    }
    const allDriver = await Driver.find(query);
    const total = await Driver.countDocuments(query);
    if (allDriver) {
      return res.status(200).json({
        success: true,
        message: "driver find successFully",
        total: total,
        result: allDriver,
        totalPage: Math.ceil(total / limit),
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}

export async function HandlerForDeleteDriver(req, res) {
  try {
    const { id } = req.params;
    await Driver.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Driver Deleted SuccessFully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}

export async function HandlerForFindParticularDriver(req, res) {
  try {
    const { id } = req.params;
    const driverData = await Driver.findById(id);
    if (driverData) {
      return res.status(200).json({
        success: true,
        message: "User Find success",
        result: driverData,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}

export async function HandlerForDriverUpdate(req, res) {
  try {
    const { id } = req.params;
    const { name, salary, route, vehicle } = req.body;
    await Driver.findByIdAndUpdate(id, {
      $set: { name: name, route: route, salary: salary, vehicle: vehicle },
    });
    return res
      .status(200)
      .json({ success: true, message: "user Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
}
