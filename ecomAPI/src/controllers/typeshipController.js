const typeshipService = require("../services/typeshipService");

const createNewTypeShip = async (req, res) => {
  try {
    const data = await typeshipService.createNewTypeShip(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailTypeshipById = async (req, res) => {
  try {
    const data = await typeshipService.getDetailTypeshipById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllTypeship = async (req, res) => {
  try {
    const data = await typeshipService.getAllTypeship(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateTypeship = async (req, res) => {
  try {
    const data = await typeshipService.updateTypeship(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteTypeship = async (req, res) => {
  try {
    const data = await typeshipService.deleteTypeship(req.body);
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
  createNewTypeShip,
  getDetailTypeshipById,
  getAllTypeship,
  updateTypeship,
  deleteTypeship,
};
