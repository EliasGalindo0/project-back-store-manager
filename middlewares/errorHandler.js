const throwError = (name, message) => {
  const error = new Error(message);
  error.name = name;
  throw error;
};

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = {
  throwError,
  NotFoundError,
};