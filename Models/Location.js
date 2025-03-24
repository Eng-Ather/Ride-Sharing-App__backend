import mongoose from "mongoose";
const { Schema } = mongoose;

const LocationSchema = new mongoose.Schema({
  area: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const LocationModel =
  mongoose.models.Location || mongoose.model("Location", LocationSchema);

  
export default LocationModel;
