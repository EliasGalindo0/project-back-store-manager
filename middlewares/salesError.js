class SalesError extends Error {
  constructor(message, name) {
    super(message, name);
    this.name = name;
  }
}

module.exports = SalesError;