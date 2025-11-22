const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    // Get token from Authorization Header
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Not authenticated. No token provided." });
    }

    // Expected format: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authenticated. No token provided." });
    }

    // Verify token
    const decodedToken = jwt.verify(token, "yourjwtsecretkey");

    if (!decodedToken) {
      return res.status(401).json({ message: "Not authenticated. Invalid token." });
    }

    // Store user info in req object
    req.userId = decodedToken.userId;

    // Token is valid → proceed
    next();

  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(401).json({ message: "Not authenticated. Invalid token." });
  }
};

module.exports = isAuth;
