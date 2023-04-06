const { Router } = require('express');
const { postRegister, postLogin, findUserById, getUsers, addToCart, getCart } = require('../controllers/users');
const router = Router();

router.post('/register', postRegister);

router.post('/login', postLogin);

router.get('/users', getUsers );

router.get('/users/:id', findUserById);

router.get('/users/:userId/cart', getCart);

router.post('/users/:userId/cart', addToCart);








module.exports = router