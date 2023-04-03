const { Router } = require('express');
const { postRegister, postLogin } = require('../controllers/users');
const router = Router();

router.post('/register', postRegister);

router.post('/login', postLogin);



















module.exports = router