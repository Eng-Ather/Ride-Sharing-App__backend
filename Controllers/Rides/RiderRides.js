import sendResponse from "../../Helpers/SendResponse.js";
import RidesModel from "../../Models/RiderRides.js";

export const RiderRides = async (req, res) => {
    try {
      const { userID, availableSeats, status, farePerSeat, routes, pickupLocation, dropLocation } = req.body;
      let newRide = RidesModel({ userID, availableSeats, status, farePerSeat, routes, pickupLocation, dropLocation });
      newRide = await newRide.save();
      sendResponse(res, 200, newRide, false, "Ride Added Successfully");
    } catch (error) {
      sendResponse(res, 404, null, true, error.message);
    }
  }