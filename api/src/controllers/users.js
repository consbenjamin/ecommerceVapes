const { User, Cart, Product } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;



const postRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.findOne({where: {email} });
    if (user) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });
    const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: '1h'});
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
    const token = jwt.sign({ id: user.id, adminPrivileges: user.adminPrivileges }, SECRET);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


///////////////////////////////////////////////////////////////

const findUserById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID de usuario no válido' });
  }
  try {
    const userId = await User.findByPk(id, {attributes: { exclude: ['password'] } });
    if (!userId) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(userId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error buscando usuario por ID' });
  }
};

///////////////////////////////////////////////////////////////

const editUser = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'ID de usuario no válido' });
  }
  
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { firstName, lastName, email, password } = req.body;

    const updatedUser = await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      password: password ? await bcrypt.hash(password, 10) : user.password,
    });

    return res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error actualizando usuario' });
  }
};

///////////////////////////////////////////////////////////////


const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error buscando usuarios' });
  }
};


///////////////////////////////////////////////////////////////

const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      return res.status(404).send('User or product not found');
    }

    const [cart, created] = await Cart.findOrCreate({
      where: { userId },
      include: [Product],
    });

    await cart.addProduct(product, { through: { quantity } });

    return res.status(201).send('Product added to cart');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

///////////////////////////////////////////////////////////////

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: Product }],
    });

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};


module.exports = { postRegister, postLogin, findUserById, editUser, getUsers, addToCart, getCart };