import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../model/user.model.js";

console.log(process.env.JWT_SECRET);

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    //if token is generated or not
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized!  No Token Provided",
      });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //if there is no decoded value or if its false
    if (!decoded) {
      return res.status(401).json({
        error: "Unauthorized Invalid Token",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(401).json({
            error: "Invalid server Error"
        })
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error in middleware" });
  }
};

export default protectRoute;
