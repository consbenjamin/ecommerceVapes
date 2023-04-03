const { Router } = require('express');
const { postRegister, postLogin, findUserById, getUsers } = require('../controllers/users');
const router = Router();

router.post('/register', postRegister);

router.post('/login', postLogin);

router.get('/users', getUsers );

router.get('/users/:id', findUserById );







module.exports = router