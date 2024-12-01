import { Teacher } from "../models/teachermodel.js";

export async function HandlerForTeacherAdd(req, res) {
  try {
    const profile = `http://localhost:5000/teachers/${req.file.filename}`;
    const { teacherName, salary, address, mobile, subject } = JSON.parse(
      req.body.data
    );
    const teacher = await Teacher.findOne({ teacherName });
    if (teacher == null) {
      const teacherData = await Teacher.create({
        teacherName,
        salary,
        mobile,
        subject,
        address,
        profile,
      });
      return res
        .status(200)
        .json({ success: true, message: "Teacher Added Successfully" });
    } else {
      return res.json({ success: false, message: "Teacher Already exists" });
    }
  } catch (error) {
    return res.json({ success: false, message: error });
  }
}

export async function HandlerForGettingAllTeacher(req, res) {
  try {
    const allTeacher = await Teacher.find();
    if (allTeacher) {
      return res.status(200).json({
        success: true,
        message: "Teacher Find Success",
        data: allTeacher,
      });
    } else {
      return res.json({ success: false, message: "Error happened" });
    }
  } catch (error) {
    return res.json({ success: false, message: error });
  }
}

export async function HandlerForTeacherEditInformation(req, res) {
  try {
    const id = req.params.id;
    const teacher = await Teacher.findById(id);

    return res
      .status(200)
      .json({ success: false, message: "Teacher Find Success", data: teacher });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
}

export async function HandlerForDeleteTeacher(req, res) {
  try {
    const id = req.params.id;
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Teacher deleted successFully" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
}
