import sendResponse from "../../Helpers/SendResponse.js";
import RidesModel from "../../Models/RiderRides.js";
import ClientModel from "../../Models/Users.js";


export const UserRide = async (req, res) => {
  try {
    const { userID, from, to } = req.body;
    const user = await ClientModel.findById(userID);
    const results = await RidesModel.find({
      routes: {
        $elemMatch: {
          latitude: {
            $gte: from.latitude - 0.001,
            $lte: from.latitude + 0.001,
          }, // +-0.01 tolerance for lat
          longitude: {
            $gte: from.longitude - 0.001,
            $lte: from.longitude + 0.001,
          }, // +-0.01 tolerance for longitude
        },
      },
    });
    if (!results || results.length == 0)
      return sendResponse(res, 403, null, true, "Ride Not Available");
    const matchingTo = await RidesModel.find({
      routes: {
        $elemMatch: {
          latitude: {
            $gte: to.latitude - 0.001,
            $lte: to.latitude + 0.001,
          }, // +-0.01 tolerance for lat
          longitude: {
            $gte: to.longitude - 0.001,
            $lte: to.longitude + 0.001,
          }, // +-0.01 tolerance for longitude
        },
      },
    })
    if (!matchingTo || matchingTo.length == 0)
      return sendResponse(res, 400, null, true, "Ride Not Available");
    const riderdata = matchingTo.map((data) => data.userID);
    const matchedRides = await ClientModel.find({
      _id: { $in: riderdata },
      gender: user.gender,
    });
    const ridersID = matchedRides.map((data) => data.id);
    const rideExpense = await RidesModel.find({
      userID: { $in: ridersID },
    });
    sendResponse(res, 200, { matchedRides, rideExpense }, false, "Rides Found" );
  } catch (error) {
    sendResponse(res, 404, null, true, error.message);
  }
};

