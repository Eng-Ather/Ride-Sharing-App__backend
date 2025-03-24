import mongoose from "mongoose";
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String },
    gender: { type: String, required: true, enum: ["male", "female"] },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    profileImage: { type: String },
    nicNo: { type: String, required : true },
    vehicleCategory: { type: String },
    vehicleNo: { type: String },
    licenseNo: { type: String },
    vehicleImage: { type: String },
    role: { type: String, required: true, enum: ["user", "driver", "admin"] },
  },
  { timestamps: true }
);

const ClientModel =
  mongoose.models.Users || mongoose.model("Users", clientSchema);

export default ClientModel;
