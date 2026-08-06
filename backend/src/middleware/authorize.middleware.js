import ForbiddenError from "../errors/ForbiddenError.js";

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError("Access denied"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ForbiddenError("You do not have permission to perform this action")
      );
    }

    next();
  };
};

export default authorize;