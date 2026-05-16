const errorMiddleware = (err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  res.status(status).json({
    success: false,
    status: status,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
