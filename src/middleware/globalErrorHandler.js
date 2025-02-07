const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');
const AppError = require('../utils/AppError');

const handleSequelizeError = (error) => {
  if (error instanceof UniqueConstraintError) {
    return new AppError(
      `Sudah ada data yang memiliki nilai yang sama dengan field: ${Object.keys(error.fields).join(', ')}`,
      400,
    );
  }

  if (error instanceof ValidationError) {
    return new AppError(
      error.errors.map((err) => err.message),
      400,
    );
  }

  if (error instanceof ForeignKeyConstraintError) {
    return new AppError(`Nilai ${error.fields.join(', ')} tidak valid`, 400);
  }
  return null;
};

const handleJWTError = (error) => {
  if (error.name === 'JsonWebTokenError') {
    return new AppError('Token tidak valid', 401);
  }

  if (error.name === 'TokenExpiredError') {
    return new AppError('Token sudah kedaluwarsa', 401);
  }
  return null;
};

const handleValidationError = (error) => {
  if (error.isJoi) {
    return new AppError(error.details.map((detail) => detail.message).join(', '), 400);
  }
  return null;
};

const globalErrorHandler = (error, req, res, next) => {
  let err = error;

  err = handleSequelizeError(error) || handleJWTError(error) || handleValidationError(error) || err;

  err.statusCode = err.statusCode || 500;
  err.isOperational = err.isOperational || false;

  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);

    return res.status(err.statusCode).json({
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    console.error('Production error:', error);

    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = globalErrorHandler;
