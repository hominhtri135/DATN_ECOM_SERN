const allcodeService = require("../services/allcodeService");

const handleCreateNewAllCode = async (req, res) => {
  try {
    const data = await allcodeService.handleCreateNewAllCode(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllCodeService = async (req, res) => {
  try {
    const data = await allcodeService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllCategoryBlog = async (req, res) => {
  try {
    const data = await allcodeService.getAllCategoryBlog(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleUpdateAllCode = async (req, res) => {
  try {
    const data = await allcodeService.handleUpdateAllCode(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailAllCodeById = async (req, res) => {
  try {
    const data = await allcodeService.getDetailAllCodeById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleDeleteAllCode = async (req, res) => {
  try {
    const data = await allcodeService.handleDeleteAllCode(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getListAllCodeService = async (req, res) => {
  try {
    const data = await allcodeService.getListAllCodeService(req.query);
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
  handleCreateNewAllCode,
  getAllCodeService,
  handleUpdateAllCode,
  getDetailAllCodeById,
  handleDeleteAllCode,
  getListAllCodeService,
  getAllCategoryBlog,
};
