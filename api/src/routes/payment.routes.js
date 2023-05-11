const { Router } = require('express');
const { postPurchasedProduct } = require('../controllers/payment');

const router = Router();

router.post('/purchase', postPurchasedProduct)













module.exports = router