const supplierService = require("../services/supplierService");

const createNewSupplier = async (req, res) => {
  try {
    const data = await supplierService.createNewSupplier(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailSupplierById = async (req, res) => {
  try {
    const data = await supplierService.getDetailSupplierById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllSupplier = async (req, res) => {
  try {
    const data = await supplierService.getAllSupplier(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateSupplier = async (req, res) => {
  try {
    const data = await supplierService.updateSupplier(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteSupplier = async (req, res) => {
  try {
    const data = await supplierService.deleteSupplier(req.body);
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
  createNewSupplier,
  getDetailSupplierById,
  getAllSupplier,
  updateSupplier,
  deleteSupplier,
};
