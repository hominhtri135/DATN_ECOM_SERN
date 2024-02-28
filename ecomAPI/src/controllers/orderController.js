const orderService = require("../services/orderService");

const createNewOrder = async (req, res) => {
  try {
    const data = await orderService.createNewOrder(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const data = await orderService.getAllOrders(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailOrderById = async (req, res) => {
  try {
    const data = await orderService.getDetailOrderById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateStatusOrder = async (req, res) => {
  try {
    const data = await orderService.updateStatusOrder(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllOrdersByUser = async (req, res) => {
  try {
    const data = await orderService.getAllOrdersByUser(req.query.userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const paymentOrder = async (req, res) => {
  try {
    const data = await orderService.paymentOrder(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const paymentOrderSuccess = async (req, res) => {
  try {
    const data = await orderService.paymentOrderSuccess(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const paymentOrderVnpaySuccess = async (req, res) => {
  try {
    const data = await orderService.paymentOrderVnpaySuccess(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const confirmOrder = async (req, res) => {
  try {
    const data = await orderService.confirmOrder(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllOrdersByShipper = async (req, res) => {
  try {
    const data = await orderService.getAllOrdersByShipper(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const paymentOrderVnpay = async (req, res) => {
  try {
    const data = await orderService.paymentOrderVnpay(req);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const confirmOrderVnpay = async (req, res) => {
  try {
    const data = await orderService.confirmOrderVnpay(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateImageOrder = async (req, res) => {
  try {
    const data = await orderService.updateImageOrder(req.body);
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
  createNewOrder,
  getAllOrders,
  getDetailOrderById,
  updateStatusOrder,
  getAllOrdersByUser,
  paymentOrder,
  paymentOrderSuccess,
  confirmOrder,
  getAllOrdersByShipper,
  paymentOrderVnpay,
  confirmOrderVnpay,
  paymentOrderVnpaySuccess,
  updateImageOrder,
};
