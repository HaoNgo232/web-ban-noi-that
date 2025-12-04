import { AxiosError } from "axios";

/**
 * Extract error message from API error response
 * @param error Error object (AxiosError or generic Error)
 * @param defaultMessage Default message if error message cannot be extracted
 * @returns User-friendly error message
 */
export function getErrorMessage(
  error: unknown,
  defaultMessage = "Đã xảy ra lỗi. Vui lòng thử lại sau.",
): string {
  if (error instanceof AxiosError) {
    // Try to get error message from response data
    if (error.response?.data) {
      const data = error.response.data;

      // Check for common error response formats
      if (typeof data === "string") {
        return data;
      }

      if (typeof data === "object") {
        // Check for message field
        if (data.message) {
          return Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message;
        }

        // Check for error field
        if (data.error) {
          return typeof data.error === "string"
            ? data.error
            : data.error.message || defaultMessage;
        }
      }
    }

    // Handle HTTP status codes
    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          return "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.";
        case 401:
          return "Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.";
        case 403:
          return "Bạn không có quyền thực hiện hành động này.";
        case 404:
          return "Không tìm thấy dữ liệu.";
        case 409:
          return "Dữ liệu đã tồn tại.";
        case 422:
          return "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.";
        case 500:
          return "Lỗi máy chủ. Vui lòng thử lại sau.";
        case 503:
          return "Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.";
        default:
          return error.message || defaultMessage;
      }
    }

    // Network error
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return "Kết nối quá thời gian. Vui lòng thử lại.";
    }

    if (error.code === "ERR_NETWORK" || !error.response) {
      return "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.";
    }

    return error.message || defaultMessage;
  }

  if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  return defaultMessage;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return !error.response || error.code === "ERR_NETWORK";
  }
  return false;
}

/**
 * Check if error is a timeout error
 */
export function isTimeoutError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.code === "ECONNABORTED" || error.message.includes("timeout");
  }
  return false;
}
