// middleware/fetchuser.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dhruvilgoodb$y"; // 🔑 Your secret key

const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // 🆕 Attach user to req
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = fetchuser;
