const shopCartService = require("../services/shopCartService");

const addShopCart = async (req, res) => {
  try {
    const data = await shopCartService.addShopCart(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllShopCartByUserId = async (req, res) => {
  try {
    const data = await shopCartService.getAllShopCartByUserId(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteItemShopCart = async (req, res) => {
  try {
    const data = await shopCartService.deleteItemShopCart(req.body);
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
  addShopCart,
  getAllShopCartByUserId,
  deleteItemShopCart,
};
