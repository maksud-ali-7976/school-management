import { Teacher } from "../models/teachermodel.js";

export async function HandlerForTeacherAdd(req, res) {
  try {
    const profile = req.file.path;
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
        createBy: req.user.id,
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
    const { page = 1, limit = 10, search = "", subject: subject } = req.query;
    const query = { createBy: req.user.id };
    if (search) {
      query.teacherName = { $regex: search, $options: "i" };
    }
    if (subject) {
      query.subject = subject;
    }
    const allTeacher = await Teacher.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Teacher.countDocuments(query);
    if (allTeacher) {
      return res.status(200).json({
        success: true,
        message: "Teacher Find Success",
        data: allTeacher,
        total: total,
        page: Number(page),
        limit: Number(limit),
        totalPage: Math.ceil(total / limit),
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
