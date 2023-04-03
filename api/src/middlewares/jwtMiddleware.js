const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { User } = require('../db');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['token'];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(token, SECRET);
    const user = await User.findByPk(decodedToken.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = { id: decodedToken.id };
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ mesagge: "Unauthorized" });
  }
};

module.exports = { verifyToken };