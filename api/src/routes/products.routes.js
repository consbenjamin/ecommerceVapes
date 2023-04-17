const { Router } = require('express');
const { getProducts, getProductsById, getProductsByName, postProducts, deleteProduct, editProduct, getBrands } = require('../controllers/products');
const { filterByBrand } = require('../controllers/filters');
const { verifyToken, isAdmin } = require('../middlewares/jwtMiddleware');
const router = Router();

router.get('/', getProducts);

router.get('/brands', getBrands);

router.get('/brands/:brandId', filterByBrand);

router.post('/', postProducts); // falta verifyToken, isAdmin,

router.delete('/:id', verifyToken, isAdmin, deleteProduct);

router.put('/:id', editProduct);

router.get('/:id', getProductsById);

router.get('/name/:name', getProductsByName);





module.exports = router

