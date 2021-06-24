class AppErrors extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends AppErrors {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotFoundError extends AppErrors {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class UnathorizedError extends AppErrors {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

class ConflictError extends AppErrors {
  constructor(message) {
    super(message)
    this.status = 409
  }
}

module.exports = {
  AppErrors,
  ValidationError,
  NotFoundError,
  UnathorizedError,
  ConflictError,
}
