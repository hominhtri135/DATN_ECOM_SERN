const receiptService = require("../services/receiptService");

const createNewReceipt = async (req, res) => {
  try {
    const data = await receiptService.createNewReceipt(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailReceiptById = async (req, res) => {
  try {
    const data = await receiptService.getDetailReceiptById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllReceipt = async (req, res) => {
  try {
    const data = await receiptService.getAllReceipt(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateReceipt = async (req, res) => {
  try {
    const data = await receiptService.updateReceipt(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteReceipt = async (req, res) => {
  try {
    const data = await receiptService.deleteReceipt(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const createNewReceiptDetail = async (req, res) => {
  try {
    const data = await receiptService.createNewReceiptDetail(req.body);
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
  createNewReceipt,
  getDetailReceiptById,
  getAllReceipt,
  updateReceipt,
  deleteReceipt,
  createNewReceiptDetail,
};
