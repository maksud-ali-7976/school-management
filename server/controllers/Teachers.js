import { Teacher } from "../models/teachermodel.js";

export async function HandlerForTeacherAdd(req, res) {
  try {
    const profile = `https://school-management-1-u1oy.onrender.com/teachers/${req.file.filename}`;
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

export async function HandlerFroTeachersUpdate(req, res) {
  try {
    const id = req.params.id;
    const { teacherName, address, salary, subject, mobile } = req.body;
    const teachers = await Teacher.findByIdAndUpdate(id, {
      $set: {
        teacherName: teacherName,
        subject: subject,
        mobile: mobile,
        salary: salary,
        address: address,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "teacher updated success" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "error happened" });
  }
}
