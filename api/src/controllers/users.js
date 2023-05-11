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


////////////////////////////CARRITO////////////////////////////

const postProductToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;
    // Buscamos todos los productos a agregar al carrito
    const productIds = products.map((product) => product.id);
    const foundProducts = await Product.findAll({
      where: {
        id: productIds,
      },
    });

    // Recorremos todos los productos a agregar al carrito
    for (const product of products) {
      const foundProduct = foundProducts.find(
        (p) => p.id === product.id
      );

      if (!foundProduct) {
        return res
          .status(404)
          .json({ message: `Product with id ${product.id} not found` });
      }

      const existingCartItem = await Cart.findOne({
        where: {
          userId: userId,
          productId: foundProduct.id,
        },
      });

      if (existingCartItem) {
        // Si ya existe un objeto de carrito con el mismo productId, simplemente aumentamos la cantidad
        existingCartItem.quantity += product.quantity;
        existingCartItem.total += foundProduct.price * product.quantity;
        existingCartItem.isUpdate = true;
        await existingCartItem.save();
      } else {
        // Si no existe un objeto de carrito con el mismo productId, creamos uno nuevo
        const cartItem = {
          quantity: product.quantity,
          price: foundProduct.price,
          image: foundProduct.img,
          total: foundProduct.price * product.quantity,
          name: foundProduct.name,
          flavor: foundProduct.flavor,
          userId,
          productId: foundProduct.id,
        };

        await Cart.create(cartItem);
      }
    }

    // Devolvemos los productos agregados al carrito junto con sus detalles
    const cartItemsWithProducts = await Cart.findAll({
      where: { userId: userId },
      include: {
        model: Product,
        attributes: ["name", "description", "price", "img"],
      },
    });

    return res
      .status(200)
      .json({ message: "Products added to cart successfully", cartItems: cartItemsWithProducts, });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


///////////////////////////////////////////////////////////////

const updateCartQuantity = async (req, res) => {
  try {
    const { userId, items } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Iteramos sobre los items y actualizamos el carrito para cada producto
    for (const item of items) {
      const { productId, quantity } = item;

      const cartItem = await Cart.findOne({
        where: {
          userId: userId,
          productId: productId
        }
      });

      if (!cartItem) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }

      cartItem.quantity = quantity;
      cartItem.total = quantity * cartItem.price;

      await cartItem.save();
    }

    // Recuperamos el carrito actualizado y lo devolvemos junto al mensaje de éxito
    const updatedCart = await Cart.findAll({
      where: {
        userId: userId
      },
      include: Product
    });

    return res.status(200).json({message:'Cart updated successfully', cart: updatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

///////////////////////////////////////////////////////////////

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.params.userId;

    // Buscamos el objeto de carrito a eliminar
    const cartItem = await Cart.findOne({
      where: {
        userId: userId,
        productId: productId
      }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Eliminamos el objeto de carrito de la base de datos
    await cartItem.destroy();

    return res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

///////////////////////////////////////////////////////////////

const getCartProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findAll({
      where: { userId },
      include: {
        model: Product,
        attributes: ['name', 'flavor']
      }
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


module.exports = { postRegister, postLogin, findUserById, editUser, getUsers, postProductToCart, getCartProducts, removeFromCart, updateCartQuantity };

