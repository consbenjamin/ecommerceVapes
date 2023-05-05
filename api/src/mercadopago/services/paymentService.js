const axios = require("axios");
const { MP_ACCESS_TOKEN } = process.env;


class PaymentService {
    async createPayment(productList) {
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
          items: [
            {
              title: "Dummy Title",
              description: "Dummy description",
              picture_url: "http://www.myapp.com/myimage.jpg",
              category_id: "category123",
              quantity: 1,
              unit_price: 10
            }
          ],
          back_urls: {
            failure: "http://localhost:3001/failure",
            pending: "http://localhost:3001/pending",
            success: "http://localhost:3001/success",
          },
          auto_return: "approved",
        };
    
        const payment = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MP_ACCESS_TOKEN}`
          }
        });
    
        return payment.data;
      }
}

module.exports = PaymentService;