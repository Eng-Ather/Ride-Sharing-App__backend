import sendResponse from "../Helpers/SendResponse.js";
import ClientModel from "../Models/Users.js";


export const AllUsers = async (req, res) => {
    try {
      const allUsers = await ClientModel.find().select("-password");
  
      if (allUsers.length === 0) {
        return sendResponse(res, 404, null, true, "No users found.");
      }
  
      sendResponse(res, 200, allUsers, false, "Fetched Data Successfully");
    } catch (error) {
      console.error("Error fetching users:", error);
      sendResponse(res, 500, null, true, "Internal Server Error");
    }
  }