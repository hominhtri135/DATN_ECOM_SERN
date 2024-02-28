const voucherService = require("../services/voucherService");

//========================TYPE VOUCHER=====================//
const createNewTypeVoucher = async (req, res) => {
  try {
    const data = await voucherService.createNewTypeVoucher(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailTypeVoucherById = async (req, res) => {
  try {
    const data = await voucherService.getDetailTypeVoucherById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllTypeVoucher = async (req, res) => {
  try {
    const data = await voucherService.getAllTypeVoucher(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateTypeVoucher = async (req, res) => {
  try {
    const data = await voucherService.updateTypeVoucher(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteTypeVoucher = async (req, res) => {
  try {
    const data = await voucherService.deleteTypeVoucher(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getSelectTypeVoucher = async (req, res) => {
  try {
    const data = await voucherService.getSelectTypeVoucher();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
//==========================VOUCHER=====================//
const createNewVoucher = async (req, res) => {
  try {
    const data = await voucherService.createNewVoucher(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailVoucherById = async (req, res) => {
  try {
    const data = await voucherService.getDetailVoucherById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllVoucher = async (req, res) => {
  try {
    const data = await voucherService.getAllVoucher(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const updateVoucher = async (req, res) => {
  try {
    const data = await voucherService.updateVoucher(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteVoucher = async (req, res) => {
  try {
    const data = await voucherService.deleteVoucher(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const saveUserVoucher = async (req, res) => {
  try {
    const data = await voucherService.saveUserVoucher(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllVoucherByUserId = async (req, res) => {
  try {
    const data = await voucherService.getAllVoucherByUserId(req.query);
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
  createNewTypeVoucher,
  getDetailTypeVoucherById,
  getAllTypeVoucher,
  updateTypeVoucher,
  deleteTypeVoucher,
  createNewVoucher,
  getDetailVoucherById,
  getAllVoucher,
  updateVoucher,
  deleteVoucher,
  getSelectTypeVoucher,
  saveUserVoucher,
  getAllVoucherByUserId,
};
