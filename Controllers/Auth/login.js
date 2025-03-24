import ClientModel from '../../Models/Users.js';
import sendResponse from '../../Helpers/SendResponse.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export default async function Login  (req, res) {
    const { email:UserEmail, password } = req.body;
    const user = await ClientModel.findOne({ email: UserEmail }).lean();
    if (!user) {return sendResponse(res, 401, null, true, "User Not Found");}
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {return sendResponse(res, 403, null, true, "Incorrect Password");}
    // Generating token with only necessary fields
    var token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
      // { expiresIn: "24h" }
    );
    return sendResponse(res,200,{ user, token },false,"User Login Successfully");
  }
