class ApiResponse {
  static success(res, statusCode = 200, message, data = null, meta = null) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
      errors: null,
    });
  }

  static error(res, statusCode = 400, message, code = null, errors = null) {
    return res.status(statusCode).json({
      success: false,
      code,
      message,
      data: null,
      meta: null,
      errors,
    });
  }
}

export default ApiResponse;
