const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getTopProducts,
  createProduct,
  createProductReview,
} = require('../controllers/productController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');


router.get('/top', getTopProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/').get(getProducts).post(protect, admin, createProduct);

module.exports = router;
