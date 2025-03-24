import express from "express";
import sendResponse from "../Helpers/SendResponse.js";
import LocationModel from "../Models/Location.js";

const locationRoutes = express.Router();

locationRoutes.post("/addLocation", async (req, res) => {
  try {
    const { area, latitude, longitude } = req.body;
    let newLocation = LocationModel({ area, latitude, longitude });
    newLocation = await newLocation.save();
    sendResponse(res, 200, newLocation, false, "Add location successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});

locationRoutes.get("/getLocations", async (req, res) => {
  try {
    const locations = await LocationModel.find();
    sendResponse(res, 200, locations, false, "fetch locations successfully");
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
});

export default locationRoutes;