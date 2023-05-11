const { User, Cart, Product, PurchasedProducts } = require('../db');

const postPurchasedProduct = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Crear una nueva entrada en la tabla PurchasedProducts para cada producto comprado
    const purchasedProducts = await Promise.all(products.map(async (product) => {
      const { id, quantity } = product;
      const selectedProduct = await Product.findByPk(id);
      const purchasedProduct = await PurchasedProducts.create({
        quantity,
        purchaseDate: new Date(),
        total: selectedProduct.price * quantity,
        productId: id,
        userId
      });
      return purchasedProduct;
    }));

    // Eliminar los productos del carrito
    await Cart.destroy({ where: { userId } });
    res.status(201).json(purchasedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};



module.exports = { postPurchasedProduct }