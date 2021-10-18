const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.protectRoute = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthorized!', 401));
  }

  const decoded = await promisify(jwt.verify)(
    token,
    config.jwt.JWT_SECRET_KEY
  );

  const user = await User.findById(decoded.userId);

  if (!user) {
    return next(new AppError('User does no longer exists!', 401));
  }

  if (user.changePasswordAt(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please re-login.', 401)
    );
  }

  req.user = user;

  next()
})
