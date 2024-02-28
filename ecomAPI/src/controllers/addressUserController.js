const addressUserService = require("../services/addressUserService");

const createNewAddressUser = async (req, res) => {
  try {
    const data = await addressUserService.createNewAddressUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllAddressUserByUserId = async (req, res) => {
  try {
    const data = await addressUserService.getAllAddressUserByUserId(
      req.query.userId
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
const deleteAddressUser = async (req, res) => {
  try {
    const data = await addressUserService.deleteAddressUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const editAddressUser = async (req, res) => {
  try {
    const data = await addressUserService.editAddressUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailAddressUserById = async (req, res) => {
  try {
    const data = await addressUserService.getDetailAddressUserById(
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
module.exports = {
  createNewAddressUser,
  getAllAddressUserByUserId,
  deleteAddressUser,
  editAddressUser,
  getDetailAddressUserById,
};
