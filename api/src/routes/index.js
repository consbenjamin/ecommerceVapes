const { Router } = require('express');

const products = require('./products.routes');
const account = require('./user.routes');
const payment = require('./payment.routes');

const router = Router();

router.use('/products', products)

router.use('/account', account)

router.use('/payment', payment)


//////////////////////////////////////////////////////////////////////////////////////////////////////MERCADOPAGO

const PaymentController = require("../mercadopago/controllers/paymentController");
const PaymentService = require("../mercadopago/services/paymentService");
const { verifyToken } = require('../middlewares/jwtMiddleware');

const PaymentInstance = new PaymentController(new PaymentService());

router.get("/", function (req, res, next) {
  return res.json({
    "/payment": "generates a payment link",
  });
});

router.get("/payment", verifyToken, async function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});




module.exports = router;