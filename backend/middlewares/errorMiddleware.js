const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
};

export { notFound, errorHandler };
