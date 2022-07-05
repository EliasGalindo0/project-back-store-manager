module.exports = (err, _req, res, next) => {
  if (err.name === 'NotFoundError') {
    res.status(404).json({ message: 'Product not found' });
    next();
  }
};