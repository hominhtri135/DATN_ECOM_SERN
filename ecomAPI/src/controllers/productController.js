const productService = require("../services/productService");

const createNewProduct = async (req, res) => {
  try {
    const data = await productService.createNewProduct(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllProductAdmin = async (req, res) => {
  try {
    const data = await productService.getAllProductAdmin(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllProductUser = async (req, res) => {
  try {
    const data = await productService.getAllProductUser(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const UnactiveProduct = async (req, res) => {
  try {
    const data = await productService.UnactiveProduct(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const ActiveProduct = async (req, res) => {
  try {
    const data = await productService.ActiveProduct(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailProductById = async (req, res) => {
  try {
    const data = await productService.getDetailProductById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const data = await productService.updateProduct(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllProductDetailById = async (req, res) => {
  try {
    const data = await productService.getAllProductDetailById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllProductDetailImageById = async (req, res) => {
  try {
    const data = await productService.getAllProductDetailImageById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const createNewProductDetail = async (req, res) => {
  try {
    const data = await productService.createNewProductDetail(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateProductDetail = async (req, res) => {
  try {
    const data = await productService.updateProductDetail(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailProductDetailById = async (req, res) => {
  try {
    const data = await productService.getDetailProductDetailById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const createNewProductDetailImage = async (req, res) => {
  try {
    const data = await productService.createNewProductDetailImage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailProductImageById = async (req, res) => {
  try {
    const data = await productService.getDetailProductImageById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateProductDetailImage = async (req, res) => {
  try {
    const data = await productService.updateProductDetailImage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteProductDetailImage = async (req, res) => {
  try {
    const data = await productService.deleteProductDetailImage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteProductDetail = async (req, res) => {
  try {
    const data = await productService.deleteProductDetail(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllProductDetailSizeById = async (req, res) => {
  try {
    const data = await productService.getAllProductDetailSizeById(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const createNewProductDetailSize = async (req, res) => {
  try {
    const data = await productService.createNewProductDetailSize(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailProductDetailSizeById = async (req, res) => {
  try {
    const data = await productService.getDetailProductDetailSizeById(
      req.query.id
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateProductDetailSize = async (req, res) => {
  try {
    const data = await productService.updateProductDetailSize(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteProductDetailSize = async (req, res) => {
  try {
    const data = await productService.deleteProductDetailSize(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getProductFeature = async (req, res) => {
  try {
    const data = await productService.getProductFeature(req.query.limit);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getProductNew = async (req, res) => {
  try {
    const data = await productService.getProductNew(req.query.limit);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getProductShopCart = async (req, res) => {
  try {
    const data = await productService.getProductShopCart(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getProductRecommend = async (req, res) => {
  try {
    const data = await productService.getProductRecommend(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createNewProduct,
  getAllProductAdmin,
  getAllProductUser,
  UnactiveProduct,
  ActiveProduct,
  getDetailProductById,
  updateProduct,
  getAllProductDetailById,
  getAllProductDetailImageById,
  createNewProductDetail,
  updateProductDetail,
  getDetailProductDetailById,
  createNewProductDetailImage,
  getDetailProductImageById,
  updateProductDetailImage,
  deleteProductDetailImage,
  deleteProductDetail,
  getAllProductDetailSizeById,
  createNewProductDetailSize,
  getDetailProductDetailSizeById,
  updateProductDetailSize,
  deleteProductDetailSize,
  getProductFeature,
  getProductNew,
  getProductShopCart,
  getProductRecommend,
};
