import sendResponse from "../Helpers/SendResponse.js";
import ClientModel from "../Models/Users.js";

export const DeleteUser  =  async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await ClientModel.findByIdAndDelete(id);
      if (!updatedUser) {
        return sendResponse(res, 404, null, true, " Not found");
      }
      sendResponse(res, 200, null, false, "Deleted successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error.message);
    }
  }