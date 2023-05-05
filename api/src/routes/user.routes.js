const { Router } = require('express');
const { postRegister, postLogin, findUserById, getUsers, postProductToCart, editUser, getCartProducts, removeFromCart, updateCartQuantity } = require('../controllers/users');
const { createAdmin, getAdminUsers, deleteUser, } = require('../controllers/admin');
const { verifyToken, isAdmin } = require('../middlewares/jwtMiddleware');
const router = Router();

router.post('/register', postRegister);

router.post('/login', postLogin);

router.get('/users', getUsers);

router.get('/users/:id', findUserById);

router.put('/editData/:id', editUser);

router.get('/cart/:userId', getCartProducts);

router.post('/users/cart', postProductToCart);

router.delete('/users/:userId/removeCart', removeFromCart);

router.put('/cart/quantity', updateCartQuantity);

router.post('/users/createAdmin', createAdmin);

router.get('/admins', verifyToken, isAdmin, getAdminUsers);

router.delete('/users/:userId', verifyToken, isAdmin, deleteUser);




module.exports = router