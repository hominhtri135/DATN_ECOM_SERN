const statisticService = require("../services/statisticService");

const getUserCancelOrderRateStatistic = async (req, res) => {
  try {
    const data = await statisticService.getUserCancelOrderRateStatistic(
      req.query
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
const getCountCardStatistic = async (req, res) => {
  try {
    const data = await statisticService.getCountCardStatistic(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getCountStatusOrder = async (req, res) => {
  try {
    const data = await statisticService.getCountStatusOrder(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getStatisticByMonth = async (req, res) => {
  try {
    const data = await statisticService.getStatisticByMonth(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getStatisticByDay = async (req, res) => {
  try {
    const data = await statisticService.getStatisticByDay(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getStatisticOverturn = async (req, res) => {
  try {
    const data = await statisticService.getStatisticOverturn(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getStatisticProfit = async (req, res) => {
  try {
    const data = await statisticService.getStatisticProfit(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getStatisticStockProduct = async (req, res) => {
  try {
    const data = await statisticService.getStatisticStockProduct(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getStatisticSoldProduct = async (req, res) => {
  try {
    const data = await statisticService.getStatisticSoldProduct(req.query);
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
  getUserCancelOrderRateStatistic,
  getCountCardStatistic,
  getCountStatusOrder,
  getStatisticByMonth,
  getStatisticByDay,
  getStatisticOverturn,
  getStatisticProfit,
  getStatisticStockProduct,
  getStatisticSoldProduct,
};
