import mongoose from "mongoose";
const { Schema } = mongoose;

const UserRideSchema = new Schema(
  {
    userID: { type: String, required: true },
    from : {"latitude": Number, "longitude" : Number},
    to : {"latitude": Number, "longitude" : Number},
  },
  { timestamps: true }
);

const RidesModel =
  mongoose.models.Rides || mongoose.model("Rides", UserRideSchema);

export default RidesModel;
