function notfound(req, res, next) {
  res.status(400);
  const error = new Error(`Not found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NOE_ENV === "production" ? "No found" : err.stack
  });
}

module.exports = {
  notfound,
  errorHandler
};
