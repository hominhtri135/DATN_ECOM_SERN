"use strict";

const userService = require("../services/userService");

const handleCreateNewUser = async (req, res) => {
  try {
    const data = await userService.handleCreateNewUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleUpdateUser = async (req, res) => {
  try {
    const data = await userService.updateUserData(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleDeleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.body.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleLogin = async (req, res) => {
  try {
    const data = await userService.handleLogin(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleChangePassword = async (req, res) => {
  try {
    const data = await userService.handleChangePassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const data = await userService.getAllUser(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailUserById = async (req, res) => {
  try {
    const data = await userService.getDetailUserById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailUserByEmail = async (req, res) => {
  try {
    const data = await userService.getDetailUserByEmail(req.query.email);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleSendVerifyEmailUser = async (req, res) => {
  try {
    const data = await userService.handleSendVerifyEmailUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleVerifyEmailUser = async (req, res) => {
  try {
    const data = await userService.handleVerifyEmailUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const handleSendEmailForgotPassword = async (req, res) => {
  try {
    const data = await userService.handleSendEmailForgotPassword(
      req.body.email
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
const handleForgotPassword = async (req, res) => {
  try {
    const data = await userService.handleForgotPassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const checkPhonenumberEmail = async (req, res) => {
  try {
    const data = await userService.checkPhonenumberEmail(req.query);
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
  handleCreateNewUser,
  handleUpdateUser,
  handleDeleteUser,
  handleLogin,
  handleChangePassword,
  getAllUser,
  getDetailUserById,
  handleSendVerifyEmailUser,
  handleVerifyEmailUser,
  handleSendEmailForgotPassword,
  handleForgotPassword,
  checkPhonenumberEmail,
  getDetailUserByEmail,
};
