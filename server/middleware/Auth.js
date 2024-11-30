import jwt from "jsonwebtoken";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    // console.log(req.cookies)
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded)
      req.user = decoded;
      // console.log(req.user)
      next();
    }else{
      res.json({message:"session expired"})
    }
  } catch (error) {
    // res.json({ success: false, message: "Session Failed" });
    console.log(error);
  }
};
