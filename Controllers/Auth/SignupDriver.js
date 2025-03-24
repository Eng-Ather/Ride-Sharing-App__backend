import bcrypt from "bcrypt"
import sendResponse from "../../Helpers/SendResponse.js";
import ClientModel from "../../Models/Users.js";


export default async function SignupDriver (req, res)  {
    const { email:Demail, password:Dpass, name, gender, phoneNumber, address, profileImage, nicNo, vehicleCategory, vehicleNo, licenseNo, vehicleImage, role  } = req.body;
    const user = await ClientModel.findOne({ email: Demail });
    if (user) return sendResponse(res, 404, null, true, "User Already Taken");
    const hashedPass = await bcrypt.hash(Dpass, 12);
    let email = Demail
    let password = hashedPass
    let newUser = new ClientModel({ email, password, name, gender, phoneNumber, address, profileImage, nicNo, vehicleCategory, vehicleNo, licenseNo, vehicleImage, role });
    newUser = await newUser.save();
    sendResponse(res, 201, newUser, false, "User Registered Successfully");
  }
