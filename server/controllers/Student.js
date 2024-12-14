import Students from "../models/students.js";

export async function HandlerForStudentAdmission(req, res) {
  try {
    const profile = req.file.path;
    const {
      studentName,
      studentFather,
      studentClass,
      totalFess,
      address,
      phone,
    } = JSON.parse(req.body.data);
    const Student = await Students.findOne({ studentName });
    console.log(req.user);
    if (Student === null) {
      const student = await Students.create({
        studentName,
        studentFather,
        studentClass,
        totalFess,
        address,
        phone,
        profile,
        addBy: req.user._id,
      });

      return res.json({
        success: true,
        message: "Student Admission SuccessFully",
        name: student,
      });
    } else {
      res.json({
        success: false,
        message: "we have Already This Admission",
      });
    }
  } catch (error) {
    return res.status(404).json({ success: false, message: "error Happen" });
  }
}

export async function HandlerForGettingAllStudents(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      studentClass: studentClass,
    } = await req.query;
    const id = req.user._id;
    const query = {};

    if (search) {
      query.studentName = { $regex: search, $options: "i" };
    }
    if (studentClass) {
      query.studentClass = studentClass;
    }
    if (id) {
      query.id = id;
    }

    const AllStudents = await Students.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Students.countDocuments(query);
    return res.json({
      success: true,
      message: "student geting success",
      result: AllStudents,
      total: total,
      page,
      totalPage: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: "error Happend" });
  }
}

export async function HandlerForParticularStudent(req, res) {
  try {
    const id = req.params.id;
    // console.log(id)
    const Student = await Students.findById(id);
    // console.log(Student);
    return res.json({
      success: true,
      message: "student Finding Success",
      data: Student,
    });
  } catch (error) {
    return res.status(402).json({ success: false, message: "Error Happened" });
  }
}

export async function HandlerForStudentDeleted(req, res) {
  const id = req.params.id;

  await Students.findByIdAndDelete(id);
  return res.status(200).json({ message: "Admission Cencaletions Success" });
}
export async function HandlerForUpdatingStudentInformation(req, res) {
  const id = req.params.id;
  const {
    studentName,
    studentFather,
    studentMother,
    totalFess,
    address,
    phone,
  } = req.body;
  await Students.findByIdAndUpdate(id, {
    $set: {
      studentName: studentName,
      studentFather: studentFather,
      studentMother: studentMother,
      totalFess: totalFess,
      address: address,
      phone: phone,
    },
  });
  return res
    .status(200)
    .json({ success: true, message: "Student Information Updated" });
}

export async function HandlerForGettingFeesPaidStudent(req, res) {
  const students = await Students.find({ feesStatus: true });
  return res
    .status(200)
    .json({ message: "Fees Paid Students Fetching success", data: students });
}
