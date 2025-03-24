import mongoose from "mongoose";
const { Schema } = mongoose;

const RidesSchema = new Schema(
  {
    userID: { type: String, required: true },
    availableSeats: { type: String },
    status :{type:String, enum:["pending", "active", "ended"], default:"pending"},
    farePerSeat : {type : String},
    routes : [{"latitude": Number, "longitude": Number}],
    pickupLocation: {type:String},
    dropLocation: {type:String},

  },
  { timestamps: true }
);

const RidesModel =
  mongoose.models.Rides || mongoose.model("Rides", RidesSchema);

export default RidesModel;
