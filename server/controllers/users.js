import User from "../models/Admin.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function HandlerForUserRegister(req, res) {
  const { name, email, password } = req.body;
  try {
    const exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.json({ success: true, message: "User Already Exits" });
    }
    const hashedPass = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPass,
    });

    return res.json({
      success: true,
      message: "user created success",
      user: user,
    });
  } catch (error) {
    return console.log(error);
  }
}

export async function HandlerForUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // console.log(user)
  if (user) {
    bcryptjs.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET
        );
        // console.log(token)
        res.cookie("token", token, {
          httpOnly: true, // Makes cookie inaccessible to client-side JS
          secure: process.env.NODE_ENV === "production", // Ensure HTTPS in production
          sameSite: "Strict", // Prevent CSRF attacks
          maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        });

        res.json({
          success: true,
          message: "user login successfully",
          token: token,
          user: user,
        });
      } else {
        res.json({ success: false, message: "invalid pass" });
      }
    });
  } else {
    return res.json({ success: false, message: "invalid email And Password" });
  }
}

export async function HandlerForCheckUserAuth(req, res) {
  const token = req.cookies?.token;
  // console.log(token)
  try {
    if (!token) {
      return res.json({ success: false, message: "User Not Authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ success: true, message: "User Authenticated", user: decoded });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function HandlerForUserLogout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  });
  return res.json({ success: true, message: "user logout success" });
}
