module.exports = ((err, _req, res, next) => {
  err.details.forEach((error) => {
    switch (error.type) {
      case 'any.required':
        res.status(400).json({ message: err.message });
        break;
      case 'string.empty':
        res.status(404).json({ message: err.message });
        break;
        case 'string.min':
          res.status(422).json({ message: err.message });
          break;
        default: res.status(500).json({ message: err.message });
    }
    next(err.name);
  });
});