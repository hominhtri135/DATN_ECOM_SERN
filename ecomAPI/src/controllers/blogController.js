const blogService = require("../services/blogService");

const createNewBlog = async (req, res) => {
  try {
    const data = await blogService.createNewBlog(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailBlogById = async (req, res) => {
  try {
    const data = await blogService.getDetailBlogById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllBlog = async (req, res) => {
  try {
    const data = await blogService.getAllBlog(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const updateBlog = async (req, res) => {
  try {
    const data = await blogService.updateBlog(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const data = await blogService.deleteBlog(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getFeatureBlog = async (req, res) => {
  try {
    const data = await blogService.getFeatureBlog(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getNewBlog = async (req, res) => {
  try {
    const data = await blogService.getNewBlog(req.query);
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
  createNewBlog,
  getDetailBlogById,
  getAllBlog,
  updateBlog,
  deleteBlog,
  getFeatureBlog,
  getNewBlog,
};
