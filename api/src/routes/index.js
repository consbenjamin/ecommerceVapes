const { Router } = require('express');

const products = require('./products.routes');
const account = require('./user.routes');

const router = Router();

router.use('/products', products)

router.use('/account', account)

module.exports = router;