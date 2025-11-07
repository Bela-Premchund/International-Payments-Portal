/*
ATTRIBUTES:
    Website:SecureBlog Activity
    Author: talia0404
    URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
    Accessed on: 2025-09-29

*/

exports.requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient rights" });
    }
    next();
  };
};

module.exports = { protect };