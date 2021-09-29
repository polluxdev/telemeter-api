// const authDb = require('../data-access/auth');
const catchAsync = require('../drivers/utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
//   const data = await authDb.login(req.body);

  const response = {
    status: 'success',
    data: 'login data'
  };

  res.status(200).json(response);
});

exports.signup = catchAsync(async (req, res, next) => {
  const data = await authDb.signup(req.body);

  const response = {
    status: 'success',
    data
  };

  res.status(201).json(response);
});