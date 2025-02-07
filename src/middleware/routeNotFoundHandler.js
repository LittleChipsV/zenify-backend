const AppError = require('../utils/AppError');

const RouteNotFoundHandler = (req, res, next) => {
  next(
    new AppError(
      `Route ${req.originalUrl} dengan request method ${req.method} tidak ditemukan`,
      404,
    ),
  );
};

module.exports = RouteNotFoundHandler;
