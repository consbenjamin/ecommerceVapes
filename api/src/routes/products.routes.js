const { Router } = require('express');
const { getProducts, getProductsById, getProductsByName, postProducts, deleteProduct, editProduct } = require('../controllers/products');
const { filterByBrand } = require('../controllers/filters');
const { verifyToken, isAdmin } = require('../middlewares/jwtMiddleware');
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.get('/name/:name', getProductsByName);

router.post('/', verifyToken, isAdmin, postProducts);

router.delete('/:id', verifyToken, isAdmin, deleteProduct);

router.put('/:id', editProduct);

router.get('/brand', filterByBrand);



module.exports = router

