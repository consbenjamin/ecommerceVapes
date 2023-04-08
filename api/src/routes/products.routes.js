const { Router } = require('express');
const { getProducts, getProductsById, getProductsByName, postProducts, deleteProduct, editProduct } = require('../controllers/products');
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.get('/name/:name', getProductsByName);

router.post('/', postProducts);

router.delete('/:id', deleteProduct);

router.put('/:id', editProduct);



module.exports = router