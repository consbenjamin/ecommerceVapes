const { User } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET } = process.env;
const { SECRET_KEY } = process.env;


const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      adminPrivileges: true, // adminPrivileges activado
    });
    const token = jwt.sign({ id: newUser.id, adminPrivileges: newUser.adminPrivileges }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ message: 'Admin user created successfully', token });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getAdminUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        adminPrivileges: true
      },
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};



module.exports = { createAdmin, getAdminUsers ,deleteUser, };