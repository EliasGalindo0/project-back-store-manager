module.exports = ((err, _req, res, next) => {
  if (err.name === 'ValidationError') {
    err.details.forEach((error) => {
      switch (error.type) {
        case ('number.positive'):
          res.status(422).json({ message: err.message });
          break;
        default: res.status(500).json({ message: err.message });
      }
    });
  } next();
});