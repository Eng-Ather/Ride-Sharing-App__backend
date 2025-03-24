import sendResponse from "../Helpers/SendResponse.js";
import ClientModel from "../Models/Users.js";

export const EditUser =  async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await ClientModel.findByIdAndUpdate(id, req.body, { new: true });
  
  
      if (!updatedUser) {
        return sendResponse(res, 404, null, true, " Not found");
      }
      sendResponse(res, 200, null, false, "Data Edit successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
    }
  }