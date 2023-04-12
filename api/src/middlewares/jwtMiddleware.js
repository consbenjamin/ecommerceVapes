const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const { User } = require('../db');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(token, SECRET);
    const user = await User.findByPk(decodedToken.id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.adminPrivileges !== true) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = { id: decodedToken.id };
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user.adminPrivileges === true) {
      next();
    } else {
      return res.status(401).json({ message: "Admin role required" });
    }
  } catch (error) {
    
    res.status(401).json({ message: "Unauthorized" });
  }
};


module.exports = { verifyToken, isAdmin };