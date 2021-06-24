class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAthorizedError extends Error {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.status = 409
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  NotAthorizedError,
  ConflictError,
}
