import { AxiosError } from "axios";

// Response error interface
export interface ApiErrorResponse {
  message: string;
  code: string;
  errors?: Record<string, string[]>;
}

/*
 * API Error class
 *
 * @class ApiError
 * @extends {Error}
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly errors?: Record<string, string[]>;

  /*
   * Constructor
   *
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {string} code - Error code
   * @param {Record<string, string[]>} errors - Error details
   */
  constructor(
    message: string,
    statusCode: number,
    code?: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
  }

  /*
   * Static method to create an ApiError from an AxiosError
   *
   * @param {AxiosError<ApiErrorResponse>} error - Axios error
   * @returns {ApiError} - ApiError instance
   */
  static fromAxiosError(error: AxiosError<ApiErrorResponse>): ApiError {
    const response = error.response;

    // If response exists, create ApiError from response data
    if (response) {
      return new ApiError(
        response.data.message,
        response.status,
        response.data.code,
        response.data.errors
      );
    }

    // If request timeout, create ApiError with timeout message
    if (error.code === "ECONNABORTED") {
      return new ApiError("Request timeout", 408, "TIMEOUT");
    }

    // If no response, create ApiError with network error message
    if (!error.response) {
      return new ApiError("Network error", 0, "NETWORK_ERROR");
    }

    return new ApiError("Unknown error", 500, "UNKNOWN");
  }

  /*
   * Getters
   *
   * @returns {boolean} - True if the error is a validation error
   */
  get isValidationError(): boolean {
    return this.statusCode === 422 && !!this.errors;
  }

  /*
   * Getters
   *
   * @returns {boolean} - True if the error is an unauthorized error
   */
  get isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  /*
   * Getters
   *
   * @returns {boolean} - True if the error is a not found error
   */
  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  /*
   * Getters
   *
   * @returns {boolean} - True if the error is a server error
   */
  get isServerError(): boolean {
    return this.statusCode >= 500;
  }
}
