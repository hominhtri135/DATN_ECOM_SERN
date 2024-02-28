const db = require("../models/index");
require("dotenv").config();
const { Op } = require("sequelize");

const createNewSupplier = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.address || !data.phonenumber || !data.email) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        await db.Supplier.create({
          name: data.name,
          address: data.address,
          phonenumber: data.phonenumber,
          email: data.email,
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
const getDetailSupplierById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const res = await db.Supplier.findOne({
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
const getAllSupplier = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
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
      const res = await db.Supplier.findAndCountAll(objectFilter);
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
const updateSupplier = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.name ||
        !data.address ||
        !data.phonenumber ||
        !data.email
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const supplier = await db.Supplier.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (supplier) {
          supplier.name = data.name;
          supplier.address = data.address;
          supplier.phonenumber = data.phonenumber;
          supplier.email = data.email;

          await supplier.save();
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
const deleteSupplier = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const supplier = await db.Supplier.findOne({
          where: { id: data.id },
        });
        if (supplier) {
          await db.Supplier.destroy({
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
  createNewSupplier: createNewSupplier,
  getDetailSupplierById: getDetailSupplierById,
  getAllSupplier: getAllSupplier,
  updateSupplier: updateSupplier,
  deleteSupplier: deleteSupplier,
};
