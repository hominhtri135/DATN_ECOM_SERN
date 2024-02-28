const db = require("../models/index");
require("dotenv").config();
const { Op } = require("sequelize");
//==================TYPE VOUCHER====================//
const createNewTypeVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.typeVoucher ||
        !data.value ||
        !data.maxValue ||
        !data.minValue
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        await db.TypeVoucher.create({
          typeVoucher: data.typeVoucher,
          value: data.value,
          maxValue: data.maxValue,
          minValue: data.minValue,
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
const getDetailTypeVoucherById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const res = await db.TypeVoucher.findOne({
          where: { id: id },
          include: [
            {
              model: db.Allcode,
              as: "typeVoucherData",
              attributes: ["value", "code"],
            },
          ],
          raw: true,
          nest: true,
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
const getAllTypeVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
        include: [
          {
            model: db.Allcode,
            as: "typeVoucherData",
            attributes: ["value", "code"],
          },
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }
      const res = await db.TypeVoucher.findAndCountAll(objectFilter);

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
const updateTypeVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.typeVoucher ||
        !data.value ||
        !data.maxValue ||
        !data.minValue
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const typevoucher = await db.TypeVoucher.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (typevoucher) {
          typevoucher.typeVoucher = data.typeVoucher;
          typevoucher.value = data.value;
          typevoucher.maxValue = data.maxValue;
          typevoucher.minValue = data.minValue;
          await typevoucher.save();
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
const deleteTypeVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const typevoucher = await db.TypeVoucher.findOne({
          where: { id: data.id },
        });
        if (typevoucher) {
          await db.TypeVoucher.destroy({
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
const getSelectTypeVoucher = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.TypeVoucher.findAll({
        include: [
          {
            model: db.Allcode,
            as: "typeVoucherData",
            attributes: ["value", "code"],
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};
//=======================VOUCHER===================
const createNewVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.fromDate ||
        !data.toDate ||
        !data.typeVoucherId ||
        !data.amount ||
        !data.codeVoucher
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        await db.Voucher.create({
          fromDate: data.fromDate,
          toDate: data.toDate,
          typeVoucherId: data.typeVoucherId,
          amount: data.amount,
          codeVoucher: data.codeVoucher,
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
const getDetailVoucherById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const res = await db.Voucher.findOne({
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
const getAllVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
        include: [
          {
            model: db.TypeVoucher,
            as: "typeVoucherOfVoucherData",
            include: [
              {
                model: db.Allcode,
                as: "typeVoucherData",
                attributes: ["value", "code"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }
      const res = await db.Voucher.findAndCountAll(objectFilter);
      if (res) {
        for (let i = 0; i < res.rows.length; i++) {
          const voucherUsed = await db.VoucherUsed.findAll({
            where: {
              voucherId: res.rows[i].id,
              status: 1,
            },
          });
          res.rows[i].usedAmount = voucherUsed.length;
        }
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
const updateVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.fromDate ||
        !data.toDate ||
        !data.typeVoucherId ||
        !data.amount ||
        !data.codeVoucher
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const voucher = await db.Voucher.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (voucher) {
          voucher.fromDate = data.fromDate;
          voucher.toDate = data.toDate;
          voucher.typeVoucherId = data.typeVoucherId;
          voucher.amount = data.amount;
          voucher.codeVoucher = data.codeVoucher;
          await voucher.save();
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
const deleteVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const voucher = await db.Voucher.findOne({
          where: { id: data.id },
        });
        if (voucher) {
          await db.Voucher.destroy({
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
const saveUserVoucher = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.voucherId || !data.userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const voucherused = await db.VoucherUsed.findOne({
          where: { voucherId: data.voucherId, userId: data.userId },
          raw: false,
        });
        if (voucherused) {
          resolve({
            errCode: 2,
            errMessage: "Đã lưu voucher này trong kho!",
          });
        } else {
          await db.VoucherUsed.create({
            voucherId: data.voucherId,
            userId: data.userId,
          });
          const voucher = await db.Voucher.findOne({
            where: { id: data.voucherId },
            raw: false,
          });

          await voucher.save();
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
const getAllVoucherByUserId = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        const objectFilter = {
          where: { userId: data.id, status: 0 },
        };
        if (data.limit && data.offset) {
          objectFilter.limit = +data.limit;
          objectFilter.offset = +data.offset;
        }

        const res = await db.VoucherUsed.findAndCountAll(objectFilter);
        for (let i = 0; i < res.rows.length; i++) {
          res.rows[i].voucherData = await db.Voucher.findOne({
            where: { id: res.rows[i].voucherId },
            include: [
              {
                model: db.TypeVoucher,
                as: "typeVoucherOfVoucherData",
                include: [
                  {
                    model: db.Allcode,
                    as: "typeVoucherData",
                    attributes: ["value", "code"],
                  },
                ],
              },
            ],
            raw: true,
            nest: true,
          });
          const voucherUsedCount = await db.VoucherUsed.findAll({
            where: {
              voucherId: res.rows[i].voucherData.id,
              status: 1,
            },
          });
          res.rows[i].voucherData.usedAmount = voucherUsedCount.length;
        }
        resolve({
          errCode: 0,
          data: res.rows,
          count: res.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewTypeVoucher: createNewTypeVoucher,
  getDetailTypeVoucherById: getDetailTypeVoucherById,
  getAllTypeVoucher: getAllTypeVoucher,
  updateTypeVoucher: updateTypeVoucher,
  deleteTypeVoucher: deleteTypeVoucher,
  createNewVoucher: createNewVoucher,
  getDetailVoucherById: getDetailVoucherById,
  getAllVoucher: getAllVoucher,
  updateVoucher: updateVoucher,
  deleteVoucher: deleteVoucher,
  getSelectTypeVoucher: getSelectTypeVoucher,
  saveUserVoucher: saveUserVoucher,
  getAllVoucherByUserId: getAllVoucherByUserId,
};
