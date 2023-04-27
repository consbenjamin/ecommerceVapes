const { Router } = require('express');
const { postRegister, postLogin, findUserById, getUsers, addToCart, getCart, editUser } = require('../controllers/users');
const { createAdmin, getAdminUsers, deleteUser, } = require('../controllers/admin');
const { verifyToken, isAdmin } = require('../middlewares/jwtMiddleware');
const router = Router();

router.post('/register', postRegister);

router.post('/login', postLogin);

router.get('/users', getUsers,);

router.get('/users/:id', findUserById);

router.put('/editData/:id', editUser);

router.get('/users/:userId/cart', getCart);

router.post('/users/:userId/cart', addToCart);

router.post('/users/createAdmin', createAdmin);

router.get('/admins', verifyToken, isAdmin, getAdminUsers);

router.delete('/users/:userId', verifyToken, isAdmin, deleteUser);




module.exports = router