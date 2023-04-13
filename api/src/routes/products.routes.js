const { Router } = require('express');
const { getProducts, getProductsById, getProductsByName, postProducts, deleteProduct, editProduct } = require('../controllers/products');
const { verifyToken, isAdmin } = require('../middlewares/jwtMiddleware');
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductsById);

router.get('/name/:name', getProductsByName);

router.post('/', verifyToken, isAdmin, postProducts);

router.delete('/:id', verifyToken, isAdmin, deleteProduct);

router.put('/:id', verifyToken, isAdmin, editProduct);



module.exports = router