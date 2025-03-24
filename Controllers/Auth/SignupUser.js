import bcrypt from "bcrypt"
import sendResponse from "../../Helpers/SendResponse.js";
import ClientModel from "../../Models/Users.js";

export default async function SignupUser (req, res) {
    const { email:Uemail, password:Upass, name, gender, phoneNumber, nicNo, address, profileImage, role   } = req.body;
    const user = await ClientModel.findOne({ email: Uemail });
    if (user) return sendResponse(res, 404, null, true, "User Already Taken");
    const hashedPass = await bcrypt.hash(Upass, 12);
    let password = hashedPass
    let email = Uemail
    let newUser = new ClientModel({ email, password, name, gender, phoneNumber, nicNo, address, profileImage, role });
    newUser = await newUser.save();
    sendResponse(res, 201, newUser, false, "User Registered Successfully");
  }
