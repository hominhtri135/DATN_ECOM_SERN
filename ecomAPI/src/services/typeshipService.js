const db = require("../models/index");
require("dotenv").config();
const { Op } = require("sequelize");

const createNewTypeShip = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type || !data.price) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        await db.TypeShip.create({
          type: data.type,
          price: data.price,
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
const getDetailTypeshipById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const res = await db.TypeShip.findOne({
          where: { id: id },
        });
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
const getAllTypeship = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
        order: [["type", "ASC"]],
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          type: { [Op.substring]: data.keyword },
        };
      const res = await db.TypeShip.findAndCountAll(objectFilter);

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
const updateTypeship = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.type || !data.price) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const typeship = await db.TypeShip.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (typeship) {
          typeship.type = data.type;
          typeship.price = data.price;
          await typeship.save();
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
const deleteTypeship = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const typeship = await db.TypeShip.findOne({
          where: { id: data.id },
        });
        if (typeship) {
          await db.TypeShip.destroy({
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
  createNewTypeShip: createNewTypeShip,
  getDetailTypeshipById: getDetailTypeshipById,
  getAllTypeship: getAllTypeship,
  updateTypeship: updateTypeship,
  deleteTypeship: deleteTypeship,
};
