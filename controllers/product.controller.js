const Product = require("../models/Product");
const productController = {};

productController.createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      originalPrice,
      isOnSale,
      stock,
      status,
    } = req.body;

    // SKU 중복 체크
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({
        status: "실패",
        error: `SKU ${sku}는 이미 존재합니다.`,
      });
    }

    const product = new Product({
      sku,
      name,
      size,
      image,
      category,
      description,
      price,
      originalPrice: originalPrice || price,
      isOnSale: isOnSale || false,
      stock,
      status,
    });

    await product.save();
    res.status(200).json({ status: "성공", product });
  } catch (error) {
    res.status(400).json({ status: "실패", error: error.message });
  }
};

productController.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "성공", data: products });
  } catch (error) {
    res.status(400).json({ status: "실패", error: error.message });
  }
};

module.exports = productController;
