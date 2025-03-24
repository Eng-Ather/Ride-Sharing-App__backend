import ClientModel from '../Models/Users.js'
import sendResponse from '../Helpers/SendResponse.js';

export default async function SpecificDriver(req, res) {
  try {
    const { id } = req.body
    const dynamicDriverDetails = await ClientModel.findById( id ).select("-password -address -nicNo");
    if (!dynamicDriverDetails) {
      return sendResponse(res, 404, null, true, "Driver not found");
    }
    const driverDetail = []
    driverDetail.push(dynamicDriverDetails)
    sendResponse(res, 200, driverDetail, false, "Driver fetched successfully")
  } catch (error) {
    sendResponse(res, 500, null, true, "Error fetching dynamic driver")
  }
}
