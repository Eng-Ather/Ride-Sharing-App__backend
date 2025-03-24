import sendResponse from "../Helpers/SendResponse.js";
import ClientModel from "../Models/Users.js";


export const AllDrivers = async (req, res) => {
    try {
      const allDrivers = await ClientModel.find({ role: "driver" }).select(
        "-password"
      );
      if (allDrivers.length === 0) {
        return sendResponse(res, 404, null, true, "No drivers found.");
      }
      sendResponse(res, 200, allDrivers, false, "Drivers Fetched Successfully");
    } catch (error) {
      console.error("Error fetching drivers:", error.message);
      sendResponse(res, 400, null, true, "Internal Server Error");
    }
  }
  