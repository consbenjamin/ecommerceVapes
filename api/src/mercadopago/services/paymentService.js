const axios = require("axios");
const { MP_ACCESS_TOKEN } = process.env;


class PaymentService {
    async createPayment(productList) {
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
          items: productList.map(item => {
            return {
              title: item.product.name,
              description: item.product.description,
              picture_url: item.product.img,
              category_id: item.product.id,
              brand_name: item.product.brand.name,
              quantity: item.quantity,
              unit_price: item.product.price
            }
          }),
          back_urls: {
            failure: "http://localhost:3001/failure",
            pending: "http://localhost:3001/pending",
            success: "http://localhost:3001/success",
          },
          auto_return: "approved",
        };

        console.log(body)
    
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