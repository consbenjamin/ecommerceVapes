const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





const postRegister = async (req, res) => {
  try {
    const { email, password, userName, firstName, lastName } = req.body;
    const user = await User.findOne({where: {email} });
    if (user) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, userName, firstName, lastName });
    const token = jwt.sign({ userId: newUser.id }, 'secretKey', { expiresIn: '1h'});
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

///////////////////////////////////////////////////////////////

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id }, 'secretKey');
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


///////////////////////////////////////////////////////////////




module.exports = { postRegister, postLogin };