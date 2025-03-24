import express from "express";
import verifyToken from "../Middleware/token.js";
import { CurrentUser } from "../Controllers/currentUser.js";
import { AllUsers } from "../Controllers/AllUsers.js";
import { AllDrivers } from "../Controllers/AllDrivers.js";
import { DeleteUser } from "../Controllers/DeleteUser.js";
import { EditUser } from "../Controllers/EditUser.js";
import { searchByCnic } from "../Controllers/SerachWithCnic.js";
import Login from "../Controllers/Auth/login.js";
import SignupUser from "../Controllers/Auth/SignupUser.js";
import SignupDriver from "../Controllers/Auth/SignupDriver.js";
import SpecificDriver from "../Controllers/SpecificDriver.js";

const userRouter = express.Router();

// for user sign up
userRouter.post("/signupUser", SignupUser);

// for Driver Signup
userRouter.post("/signupRider", SignupDriver);

// API for login 
userRouter.post("/login", Login);

// Route to get current user
userRouter.get("/currentUser", verifyToken, CurrentUser);

// to get All user data
userRouter.get("/allUsers", AllUsers);

// delete user API
userRouter.delete("/:id", DeleteUser);

// Edit user API
userRouter.put("/:id", EditUser);

// get user by cnic
userRouter.post("/searchByCnic", searchByCnic);

//For fetching All Drivers
userRouter.get("/allDrivers", AllDrivers);

//for fetching specific driver
userRouter.post("/getDynamicDriver", SpecificDriver);

export default userRouter;




// const userRegisterSchema = Joi.object({
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: { allow: ["com", "net"] },
//   }),
//   password: Joi.string().min(8).required(),
//   name: Joi.string().min(3).max(30).required(),
//   gender: Joi.string().min(3).max(30).required(),
//   phoneNumber: Joi.number(),
//   nicNo: Joi.string().min(13).required(),
//   address: Joi.string().min(10).max(50).required(),
//   profileImage: Joi.string().required(),
//   role: Joi.string().required(),
// });

// userRouter.post("/signupUser", async (req, res) => {
//   const { error, value } = userRegisterSchema.validate(req.body);
//   if (error) return sendResponse(res, 400, null, true, error.message);
//   const user = await ClientModel.findOne({ email: value.email });
//   if (user) return sendResponse(res, 404, null, true, "User Already Taken");
//   const hashedPass = await bcrypt.hash(value.password, 12);
//   value.password = hashedPass;
//   let newUser = new ClientModel({ ...value });
//   newUser = await newUser.save();
//   sendResponse(res, 201, newUser, false, "User Registered Successfully");
// });