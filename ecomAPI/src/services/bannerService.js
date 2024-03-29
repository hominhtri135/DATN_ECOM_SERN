const db = require("../models/index");
require("dotenv").config();
const { Op } = require("sequelize");
const createNewBanner = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.image || !data.description || !data.name) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        await db.Banner.create({
          name: data.name,
          description: data.description,
          image: data.image,
          statusId: "S1",
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailBanner = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const res = await db.Banner.findOne({
          where: { id: id },
        });
        if (res && res.image) {
          res.image = Buffer.from(res.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          data: res,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllBanner = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
        where: { statusId: "S1" },
        order: [["createdAt", "DESC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          name: { [Op.substring]: data.keyword },
        };
      const res = await db.Banner.findAndCountAll(objectFilter);
      if (res.rows && res.rows.length > 0) {
        res.rows.map(
          (item) =>
            (item.image = Buffer.from(item.image, "base64").toString("binary"))
        );
      }
      resolve({
        errCode: 0,
        data: res.rows,
        count: res.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const updateBanner = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.image || !data.description || !data.name) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const banner = await db.Banner.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (banner) {
          banner.name = data.name;
          banner.description = data.description;
          banner.image = data.image;

          await banner.save();
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteBanner = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const banner = await db.Banner.findOne({
          where: { id: data.id },
        });
        if (banner) {
          await db.Banner.destroy({
            where: { id: data.id },
          });
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewBanner: createNewBanner,
  getDetailBanner: getDetailBanner,
  getAllBanner: getAllBanner,
  updateBanner: updateBanner,
  deleteBanner: deleteBanner,
};
