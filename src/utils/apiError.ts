class apiError extends Error {
  statusCode: number;
  errors: string[];

  constructor(
    message = "Something went wrong",
    statusCode: number = 500,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default apiError;
