const { Cart, Brand, Product } = require('../../db');
// const jwt = require("jsonwebtoken");
// const { SECRET } = process.env;

class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {
      // const token = req.headers["x-access-token"];
      // const decoded = jwt.verify(token, SECRET);
      // const userId = decoded.id;

      const productList = await Cart.findAll({
        include: [
          {
            model: Product,
            include: {
              model: Brand,
            },
          },
        ],
      });

      console.log(productList)
      const payment = await this.subscriptionService.createPayment(productList);

      return res.json(payment);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
  }
}

module.exports = PaymentController;