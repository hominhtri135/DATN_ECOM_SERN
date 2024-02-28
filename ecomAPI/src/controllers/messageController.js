const messageService = require("../services/messageService");

const createNewRoom = async (req, res) => {
  try {
    const data = await messageService.createNewRoom(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const sendMessage = async (req, res) => {
  try {
    const data = await messageService.sendMessage(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const loadMessage = async (req, res) => {
  try {
    const data = await messageService.loadMessage(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const listRoomOfUser = async (req, res) => {
  try {
    const data = await messageService.listRoomOfUser(req.query.userId);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const listRoomOfAdmin = async (req, res) => {
  try {
    const data = await messageService.listRoomOfAdmin();
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
  createNewRoom,
  sendMessage,
  loadMessage,
  listRoomOfUser,
  listRoomOfAdmin,
};
