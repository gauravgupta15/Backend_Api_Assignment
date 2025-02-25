const express = require("express");
const { body } = require("express-validator");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  authMiddleware,
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
  ],
  createProduct
);
router.put(
  "/:id",
  authMiddleware,
  [
    body("name").optional().notEmpty().withMessage("Product name cannot be empty"),
    body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
  ],
  updateProduct
);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;  // **Export the router directly**
