import sendResponse from "../Helpers/SendResponse.js";
import ClientModel from "../Models/Users.js";

export const CurrentUser = async (req, res) => {
  try {
    const currentUser = await ClientModel.findById(req.user.id).select(
      "-password -address"
    );
    sendResponse(res, 200, currentUser, false, "Fetched Data Successfully");
  } catch (error) {
    sendResponse(res, 500, null, true, "xxxxxxxxxxxxxx");
  }
};
