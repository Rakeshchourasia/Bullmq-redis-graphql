const jwt = require("jsonwebtoken");

const getUserFromToken = (token) => {
  try {
    if (!token) return null;

    const cleanToken = token.replace(
      "Bearer ",
      ""
    );

    const decoded = jwt.verify(
      cleanToken,
      process.env.JWT_SECRET
    );

    return decoded;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = getUserFromToken;
