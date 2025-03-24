import sendResponse from "../Helpers/SendResponse.js";
import ClientModel from "../Models/Users.js";


export const searchByCnic =  async (req, res) => {
    try {
      const { nicNo } = req.body;
      console.log("nicNo bck end sa ", nicNo);
      
      const userSearchByCinic = await ClientModel.findOne({ nicNo})
  
      if (!userSearchByCinic) {
        return sendResponse(res, 404, null, true, "Cnic is required");
      }
  
      sendResponse(res, 200, userSearchByCinic, false, "User Found Successfully");
    } catch (error) {
      sendResponse(res, 500, null, true, error);
    }
  }