class ApiError extends Error {
  statusCode?: number;
  status?: string;

  constructor(message?: string, statusCode?: number, status?: string) {
    super(message);
  }
}

export { ApiError };
