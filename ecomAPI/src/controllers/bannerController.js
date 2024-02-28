const bannerService = require("../services/bannerService");

const createNewBanner = async (req, res) => {
  try {
    const data = await bannerService.createNewBanner(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailBanner = async (req, res) => {
  try {
    const data = await bannerService.getDetailBanner(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllBanner = async (req, res) => {
  try {
    const data = await bannerService.getAllBanner(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateBanner = async (req, res) => {
  try {
    const data = await bannerService.updateBanner(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteBanner = async (req, res) => {
  try {
    const data = await bannerService.deleteBanner(req.body);
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
  createNewBanner,
  getDetailBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
};
