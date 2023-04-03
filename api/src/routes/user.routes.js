const { Router } = require('express');
const { postRegister, postLogin } = require('../controllers/users');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const router = Router();

router.post('/register', verifyToken, postRegister);

router.post('/login', verifyToken, postLogin);





module.exports = router