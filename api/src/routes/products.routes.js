const { Router } = require('express');
const { getProducts, getProductsById ,postProducts, deleteProduct, editProduct } = require('../controllers/products');
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.post('/', async (req, res) => {
  const {name, img, description, price, flavor} = req.body;
  try {
    await postProducts(name, img, description, price, flavor);
    res.status(200).send('Producto creado!')
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', deleteProduct);

router.put('/:id', editProduct);



module.exports = router