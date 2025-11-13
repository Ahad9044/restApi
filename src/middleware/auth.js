import jwt from "jsonwebtoken";
import { modelExpo } from "../models/user.js";


export const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;  // ✅ should be 'req.cookies'
    if (!token) {
      return res.status(401).send("Unauthorized user!");
    }

    const decodedMessage = jwt.verify(token, "Ahad1234@"); // ✅ verify token

    const user = await modelExpo.findOne({ _id: decodedMessage.id }); // ✅ await the DB call
    if (!user) {
      return res.status(404).send("User not found!");
    }

    req.user = user; // ✅ attach the actual user object
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).send("Invalid or expired token!");
  }
};
