const { Router } = require('express');
const { getProducts, getProductsById, getProductByName, postProducts, deleteProduct, editProduct } = require('../controllers/products');
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.get('/name/:name', getProductByName);

router.post('/', postProducts);

router.delete('/:id', deleteProduct);

router.put('/:id', editProduct);



module.exports = router