import asyncHandler from "express-async-handler";
import UserService from "../../services/v1/user.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class UserController {
  // GET ME

  static getMe = asyncHandler(async (req, res) => {
    ApiResponse.success(res, 200, "User data retrieved", { user: req.user });
  });

  // UPDATE ME

  static updateMe = asyncHandler(async (req, res) => {
    const userData = req.user;
    const inputData = req.body;

    const { message, data } = await UserService.updateMe(userData, inputData);

    ApiResponse.success(res, 200, message, { user: data });
  });

  // DELETE ME

  static deleteMe = asyncHandler(async (req, res) => {
    const userData = req.user;

    const { message } = await UserService.deleteMe(userData);

    ApiResponse.success(res, 200, message);
  });
}

export default UserController;
