const { decodedToken } = require("../utils/common");
const { User } = require('../models/user');
const { httpErrorResponseHandler } = require('../utils/common');

const auth = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header('token');
      if (!token) {
        return httpErrorResponseHandler(res, 401, "No token provided");
      }

      const decoded = await decodedToken(token);
      if (!decoded) {
        return httpErrorResponseHandler(res, 401, "Authorization Failed");
      }

      const user = await User.findOne({ _id: decoded.userId });
      if (!user) {
        return httpErrorResponseHandler(res, 401, "User not found");
      }

      req.user = { _id: user._id, role: user.role };

      if (!requiredRoles.includes(user.role)) {
        return httpErrorResponseHandler(res, 403, "You are not authorized to access this route");
      }

      next();
    } catch (err) {
      console.error(err);
      return httpErrorResponseHandler(res, 500, "Authorization Failed");
    }
  };
};

module.exports = auth;
