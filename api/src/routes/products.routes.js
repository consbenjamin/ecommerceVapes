const { Router } = require('express');
const { getProducts, getProductsById, getProductsByName, postProducts, deleteProduct, editProduct } = require('../controllers/products');
const { verifyToken, isAdmin } = require('../middlewares/jwtMiddleware');
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.get('/name/:name', getProductsByName);

router.post('/', verifyToken, isAdmin, postProducts);

router.delete('/:id', deleteProduct);

router.put('/:id', editProduct);



module.exports = router