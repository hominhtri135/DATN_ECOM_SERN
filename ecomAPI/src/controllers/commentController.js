const commentService = require("../services/commentService");

const createNewReview = async (req, res) => {
  try {
    const data = await commentService.createNewReview(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllReviewByProductId = async (req, res) => {
  try {
    const data = await commentService.getAllReviewByProductId(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const ReplyReview = async (req, res) => {
  try {
    const data = await commentService.ReplyReview(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteReview = async (req, res) => {
  try {
    const data = await commentService.deleteReview(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const createNewComment = async (req, res) => {
  try {
    const data = await commentService.createNewComment(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllCommentByBlogId = async (req, res) => {
  try {
    const data = await commentService.getAllCommentByBlogId(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const ReplyComment = async (req, res) => {
  try {
    const data = await commentService.ReplyComment(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    const data = await commentService.deleteComment(req.body);
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
  createNewReview,
  getAllReviewByProductId,
  ReplyReview,
  deleteReview,
  createNewComment,
  getAllCommentByBlogId,
  deleteComment,
  ReplyComment,
};
