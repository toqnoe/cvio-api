import asyncHandler from "express-async-handler";
import AuthService from "../../services/v1/auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import logger from "../../utils/logger.js";
import env from "../../../config/env.js";

// Utils

const setRefreshCookie = (res, value) => {
  res.cookie("refreshToken", value, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "development" ? "lax" : "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

const clearCookie = (res, name) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "development" ? "lax" : "none",
  });
};

class AuthController {
  // REGISTER

  static register = asyncHandler(async (req, res) => {
    const inputData = req.body;

    const { message, data } = await AuthService.register(inputData);

    // Log registration
    logger.info(
      `User ${data.id} registered at ${req.ip} using ${req.get("User-Agent")}`,
    );

    ApiResponse.success(res, 201, message);
  });

  // LOGIN

  static login = asyncHandler(async (req, res) => {
    const inputData = req.body;

    const { message, tokens, data } = await AuthService.login(inputData);

    // Store refresh token cookie
    setRefreshCookie(res, tokens.refreshToken);

    // Log login
    logger.info(
      `User ${data.id} logged in at ${req.ip} using ${req.get("User-Agent")}`,
    );

    ApiResponse.success(res, 200, message, {
      accessToken: tokens.accessToken,
      user: data,
    });
  });

  // REFRESH

  static refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    const { message, tokens } = await AuthService.refresh(refreshToken);

    setRefreshCookie(res, tokens.refreshToken);

    ApiResponse.success(req, 200, message, { accessToken: tokens.accessToken });
  });

  // LOGOUT

  static logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    const { message, userId } = await AuthService.logout(refreshToken);

    clearCookie(res, "refreshToken");

    logger.info(
      userId
        ? `User ${userId} logged out at ${req.ip} using ${req.get("User-Agent")}`
        : "Logout request completed",
    );

    ApiResponse.success(res, 200, message);
  });

  // LOGOUT-ALL

  static logoutAll = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    const { message, userId } = await AuthService.logoutAll(refreshToken);

    clearCookie(res, "refreshToken");

    logger.info(
      userId
        ? `User ${userId} logged out from all devices at ${req.ip} using ${req.get("User-Agent")}`
        : "Logout from all devices request completed",
    );

    ApiResponse.success(res, 200, message);
  });
}

export default AuthController;
