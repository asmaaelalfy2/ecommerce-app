exports.NotFound = function(req, res, next){
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};
exports.HandleError = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({ message: err.message });

  next();
};

// module.exports={Han}