const { Op } = require("sequelize");
const db = require("../models/index");

const moment = require("moment");
require("moment/locale/vi");

function compareDates(d1, d2) {
  //  lon hon la false
  //  be hon la true

  let parts = d1.split("/");
  d1 = Number(parts[2] + parts[1] + parts[0]);
  parts = d2.split("/");
  d2 = Number(parts[2] + parts[1] + parts[0]);

  if (d1 <= d2) return true;
  if (d1 >= d2) return false;
}
const getCountCardStatistic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const countUser = await db.User.count({ where: { statusId: "S1" } });
      const countProduct = await db.Product.count();
      const countReview = await db.Comment.count({
        where: {
          star: { [Op.gt]: 0 },
        },
      });
      const countOrder = await db.OrderProduct.count({
        where: {
          statusId: { [Op.ne]: "S7" },
        },
      });
      const data = {
        countUser,
        countProduct,
        countReview,
        countOrder,
      };
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getCountStatusOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.oneDate && !data.twoDate) {
        resolve({
          errCode: 1,
          data: "Missing required paramenter !",
        });
      } else {
        const statusOrder = await db.Allcode.findAll({
          where: { type: "STATUS-ORDER" },
        });
        let objectCount = {};
        const arrayLable = [];
        const arrayValue = [];
        if (statusOrder) {
          let orderProduct = await db.OrderProduct.findAll();
          orderProduct = orderProduct.filter((item) => {
            if (data.type == "day") {
              let updatedAt = moment
                .utc(item.updatedAt)
                .format("DD/MM/YYYY")
                .split("/");
              updatedAt = Number(updatedAt[2] + updatedAt[1] + updatedAt[0]);

              let twoDate = moment(data.twoDate)
                .format("DD/MM/YYYY")
                .split("/");
              twoDate = Number(twoDate[2] + twoDate[1] + twoDate[0]);
              let oneDate = moment(data.oneDate)
                .format("DD/MM/YYYY")
                .split("/");
              oneDate = Number(oneDate[2] + oneDate[1] + oneDate[0]);

              if (updatedAt >= oneDate && updatedAt <= twoDate) {
                return true;
              }
            } else if (data.type == "month") {
              const updatedAtMonth = moment.utc(item.updatedAt).format("M");
              const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
              if (
                moment(data.oneDate).format("M") == updatedAtMonth &&
                moment(data.oneDate).format("YYYY") == updatedAtYear
              ) {
                return true;
              }
            } else {
              const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
              if (moment(data.oneDate).format("YYYY") == updatedAtYear) {
                return true;
              }
            }
          });

          for (let i = 0; i < statusOrder.length; i++) {
            arrayLable.push(statusOrder[i].value);

            arrayValue.push(
              orderProduct.filter((item) => {
                return item.statusId == statusOrder[i].code;
              }).length
            );
          }

          objectCount = {
            arrayLable,
            arrayValue,
          };

          resolve({
            errCode: 0,
            data: objectCount,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const totalPriceDiscount = (price, discount) => {
  if (discount.voucherData.typeVoucherOfVoucherData.typeVoucher === "percent") {
    if (
      (price * discount.voucherData.typeVoucherOfVoucherData.value) / 100 >
      discount.voucherData.typeVoucherOfVoucherData.maxValue
    ) {
      return price - discount.voucherData.typeVoucherOfVoucherData.maxValue;
    } else {
      return (
        price -
        (price * discount.voucherData.typeVoucherOfVoucherData.value) / 100
      );
    }
  } else {
    return price - discount.voucherData.typeVoucherOfVoucherData.maxValue;
  }
};
function DaysOfMonth(thang, nam) {
  let mon = parseInt(thang, 10);
  let yar = parseInt(nam, 10);
  switch (mon) {
    case 2:
      if (yar % 4 == 0 && yar % 400 != 0) return 29;
      else return 28;
      break;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
      break;
    default:
      return 30;
  }
}
const getStatisticByMonth = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.year) {
        resolve({
          errCode: 1,
          data: "Missing required paramenter !",
        });
      } else {
        let orderProduct = await db.OrderProduct.findAll({
          where: { statusId: "S6" },
          include: [
            { model: db.TypeShip, as: "typeShipData" },
            { model: db.Voucher, as: "voucherData" },
            { model: db.Allcode, as: "statusOrderData" },
          ],
          raw: true,
          nest: true,
        });
        for (let i = 0; i < orderProduct.length; i++) {
          orderProduct[i].orderDetail = await db.OrderDetail.findAll({
            where: { orderId: orderProduct[i].id },
          });
          orderProduct[i].voucherData.typeVoucherOfVoucherData =
            await db.TypeVoucher.findOne({
              where: { id: orderProduct[i].voucherData.typeVoucherId },
            });
          let totalprice = 0;
          for (let j = 0; j < orderProduct[i].orderDetail.length; j++) {
            totalprice =
              totalprice +
              orderProduct[i].orderDetail[j].realPrice *
                orderProduct[i].orderDetail[j].quantity;
          }
          if (orderProduct[i].voucherId) {
            orderProduct[i].totalpriceProduct =
              totalPriceDiscount(totalprice, orderProduct[i]) +
              orderProduct[i].typeShipData.price;
          } else {
            orderProduct[i].totalpriceProduct =
              totalprice + orderProduct[i].typeShipData.price;
          }
        }

        const arrayMonthLable = [];
        const arrayMonthValue = [];
        for (let i = 1; i <= 12; i++) {
          arrayMonthLable.push("Th " + i);
          let price = 0;
          for (let j = 0; j < orderProduct.length; j++) {
            if (
              moment(orderProduct[j].updatedAt).format("YYYY") === data.year &&
              +moment(orderProduct[j].updatedAt).format("MM") === i
            ) {
              price = price + orderProduct[j].totalpriceProduct;
            }
          }
          arrayMonthValue.push(price);
        }
        resolve({
          errCode: 0,
          data: {
            arrayMonthLable,
            arrayMonthValue,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getStatisticByDay = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.month && !data.year) {
        resolve({
          errCode: 1,
          data: "Missing required paramenter !",
        });
      } else {
        const day = DaysOfMonth(data.month, data.year);
        let orderProduct = await db.OrderProduct.findAll({
          where: { statusId: "S6" },
          include: [
            { model: db.TypeShip, as: "typeShipData" },
            { model: db.Voucher, as: "voucherData" },
            { model: db.Allcode, as: "statusOrderData" },
          ],
          raw: true,
          nest: true,
        });
        for (let i = 0; i < orderProduct.length; i++) {
          orderProduct[i].orderDetail = await db.OrderDetail.findAll({
            where: { orderId: orderProduct[i].id },
          });
          orderProduct[i].voucherData.typeVoucherOfVoucherData =
            await db.TypeVoucher.findOne({
              where: { id: orderProduct[i].voucherData.typeVoucherId },
            });
          let totalprice = 0;
          for (let j = 0; j < orderProduct[i].orderDetail.length; j++) {
            totalprice =
              totalprice +
              orderProduct[i].orderDetail[j].realPrice *
                orderProduct[i].orderDetail[j].quantity;
          }

          if (orderProduct[i].voucherId) {
            orderProduct[i].totalpriceProduct =
              totalPriceDiscount(totalprice, orderProduct[i]) +
              orderProduct[i].typeShipData.price;
          } else {
            orderProduct[i].totalpriceProduct =
              totalprice + orderProduct[i].typeShipData.price;
          }
        }

        const arrayDayLable = [];
        const arrayDayValue = [];

        for (let i = 1; i <= day; i++) {
          if (
            +moment(new Date()).format("DD") == i &&
            data.year === moment(new Date()).format("YYYY") &&
            data.month === moment(new Date()).format("M")
          ) {
            arrayDayLable.push("Today");
          } else {
            arrayDayLable.push(i);
          }

          let price = 0;
          for (let j = 0; j < orderProduct.length; j++) {
            if (
              moment(orderProduct[j].updatedAt).format("YYYY") === data.year &&
              moment(orderProduct[j].updatedAt).format("M") === data.month &&
              +moment(orderProduct[j].updatedAt).format("DD") === i
            ) {
              price = price + orderProduct[j].totalpriceProduct;
            }
          }
          arrayDayValue.push(price);
        }
        resolve({
          errCode: 0,
          data: {
            arrayDayLable,
            arrayDayValue,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getStatisticProfit = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.oneDate && !data.twoDate) {
        resolve({
          errCode: 1,
          data: "Missing required paramenter !",
        });
      } else {
        let orderProduct = await db.OrderProduct.findAll({
          where: { statusId: "S6" },
          include: [
            { model: db.TypeShip, as: "typeShipData" },
            { model: db.Voucher, as: "voucherData" },
            { model: db.Allcode, as: "statusOrderData" },
          ],
          raw: true,
          nest: true,
        });

        for (let i = 0; i < orderProduct.length; i++) {
          orderProduct[i].orderDetail = await db.OrderDetail.findAll({
            where: { orderId: orderProduct[i].id },
          });
          orderProduct[i].voucherData.typeVoucherOfVoucherData =
            await db.TypeVoucher.findOne({
              where: { id: orderProduct[i].voucherData.typeVoucherId },
            });
          let totalprice = 0;
          let importPrice = 0;
          for (let j = 0; j < orderProduct[i].orderDetail.length; j++) {
            const receiptDetail = await db.ReceiptDetail.findAll({
              where: {
                productDetailSizeId: orderProduct[i].orderDetail[j].productId,
              },
            });
            let avgPrice = 0;
            let avgQuantity = 0;
            for (let k = 0; k < receiptDetail.length; k++) {
              avgPrice =
                avgPrice + receiptDetail[k].quantity * receiptDetail[k].price;
              avgQuantity = avgQuantity + receiptDetail[k].quantity;
            }
            orderProduct[i].orderDetail[j].importPrice = Math.round(
              avgPrice / avgQuantity
            );
            importPrice =
              importPrice +
              Math.round(avgPrice / avgQuantity) *
                orderProduct[i].orderDetail[j].quantity;
            totalprice =
              totalprice +
              orderProduct[i].orderDetail[j].realPrice *
                orderProduct[i].orderDetail[j].quantity;
          }
          orderProduct[i].importPrice = importPrice;
          if (orderProduct[i].voucherId) {
            orderProduct[i].totalpriceProduct =
              totalPriceDiscount(totalprice, orderProduct[i]) +
              orderProduct[i].typeShipData.price;
            orderProduct[i].profitPrice =
              totalPriceDiscount(totalprice, orderProduct[i]) +
              orderProduct[i].typeShipData.price -
              importPrice;
          } else {
            orderProduct[i].totalpriceProduct =
              totalprice + orderProduct[i].typeShipData.price;
            orderProduct[i].profitPrice =
              totalprice + orderProduct[i].typeShipData.price - importPrice;
          }
        }

        orderProduct = orderProduct.filter((item) => {
          if (data.type == "day") {
            let updatedAt = moment
              .utc(item.updatedAt)
              .format("DD/MM/YYYY")
              .split("/");
            updatedAt = Number(updatedAt[2] + updatedAt[1] + updatedAt[0]);

            let twoDate = moment(data.twoDate).format("DD/MM/YYYY").split("/");
            twoDate = Number(twoDate[2] + twoDate[1] + twoDate[0]);
            let oneDate = moment(data.oneDate).format("DD/MM/YYYY").split("/");
            oneDate = Number(oneDate[2] + oneDate[1] + oneDate[0]);

            if (updatedAt >= oneDate && updatedAt <= twoDate) {
              return true;
            }
          } else if (data.type == "month") {
            const updatedAtMonth = moment.utc(item.updatedAt).format("M");
            const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
            if (
              moment(data.oneDate).format("M") == updatedAtMonth &&
              moment(data.oneDate).format("YYYY") == updatedAtYear
            ) {
              return true;
            }
          } else {
            const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
            if (moment(data.oneDate).format("YYYY") == updatedAtYear) {
              return true;
            }
          }
        });

        resolve({
          errCode: 0,
          data: orderProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getStatisticOverturn = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.oneDate && !data.twoDate) {
        resolve({
          errCode: 1,
          data: "Missing required paramenter !",
        });
      } else {
        let orderProduct = await db.OrderProduct.findAll({
          where: { statusId: "S6" },
          include: [
            { model: db.TypeShip, as: "typeShipData" },
            { model: db.Voucher, as: "voucherData" },
            { model: db.Allcode, as: "statusOrderData" },
          ],
          raw: true,
          nest: true,
        });
        for (let i = 0; i < orderProduct.length; i++) {
          orderProduct[i].orderDetail = await db.OrderDetail.findAll({
            where: { orderId: orderProduct[i].id },
          });
          orderProduct[i].voucherData.typeVoucherOfVoucherData =
            await db.TypeVoucher.findOne({
              where: { id: orderProduct[i].voucherData.typeVoucherId },
            });
          let totalprice = 0;
          for (let j = 0; j < orderProduct[i].orderDetail.length; j++) {
            totalprice =
              totalprice +
              orderProduct[i].orderDetail[j].realPrice *
                orderProduct[i].orderDetail[j].quantity;
          }

          if (orderProduct[i].voucherId) {
            orderProduct[i].totalpriceProduct =
              totalPriceDiscount(totalprice, orderProduct[i]) +
              orderProduct[i].typeShipData.price;
          } else {
            orderProduct[i].totalpriceProduct =
              totalprice + orderProduct[i].typeShipData.price;
          }
        }
        orderProduct = orderProduct.filter((item) => {
          if (data.type == "day") {
            let updatedAt = moment
              .utc(item.updatedAt)
              .format("DD/MM/YYYY")
              .split("/");
            updatedAt = Number(updatedAt[2] + updatedAt[1] + updatedAt[0]);

            let twoDate = moment(data.twoDate).format("DD/MM/YYYY").split("/");
            twoDate = Number(twoDate[2] + twoDate[1] + twoDate[0]);
            let oneDate = moment(data.oneDate).format("DD/MM/YYYY").split("/");
            oneDate = Number(oneDate[2] + oneDate[1] + oneDate[0]);

            if (updatedAt >= oneDate && updatedAt <= twoDate) {
              return true;
            }
          } else if (data.type == "month") {
            const updatedAtMonth = moment.utc(item.updatedAt).format("M");
            const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
            if (
              moment(data.oneDate).format("M") == updatedAtMonth &&
              moment(data.oneDate).format("YYYY") == updatedAtYear
            ) {
              return true;
            }
          } else {
            const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
            if (moment(data.oneDate).format("YYYY") == updatedAtYear) {
              return true;
            }
          }
        });

        resolve({
          errCode: 0,
          data: orderProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getStatisticStockProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
        include: [
          { model: db.Allcode, as: "sizeData", attributes: ["value", "code"] },
        ],
        raw: true,
        nest: true,
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }

      const res = await db.ProductDetailSize.findAndCountAll(objectFilter);
      for (let i = 0; i < res.rows.length; i++) {
        const receiptDetail = await db.ReceiptDetail.findAll({
          where: { productDetailSizeId: res.rows[i].id },
        });
        const orderDetail = await db.OrderDetail.findAll({
          where: { productId: res.rows[i].id },
        });
        let quantity = 0;
        res.rows[i].productDetaildData = await db.ProductDetail.findOne({
          where: { id: res.rows[i].productdetailId },
        });
        res.rows[i].productData = await db.Product.findOne({
          where: { id: res.rows[i].productDetaildData.productId },
          include: [
            {
              model: db.Allcode,
              as: "brandData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "categoryData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "statusData",
              attributes: ["value", "code"],
            },
          ],
          raw: true,
          nest: true,
        });
        for (let j = 0; j < receiptDetail.length; j++) {
          quantity = quantity + receiptDetail[j].quantity;
        }
        for (let k = 0; k < orderDetail.length; k++) {
          const order = await db.OrderProduct.findOne({
            where: { id: orderDetail[k].orderId },
          });
          if (order.statusId != "S7") {
            quantity = quantity - orderDetail[k].quantity;
          }
        }

        res.rows[i].stock = quantity;
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
const getUserCancelOrderRateStatistic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // lấy danh sách user trừ admin và saler
      let allUser = await db.User.findAll({
        where: {
          [Op.and]: [
            { roleId: { [Op.ne]: "R1" } },
            { roleId: { [Op.ne]: "R3" } },
          ],
        },
        attributes: ["id", "email", "firstName", "lastName"],
        raw: true,
      });

      // lặp danh sách user để lấy ra tất cả đơn hàng theo địa chỉ người dùng
      for (const user of allUser) {
        user.successCount = 0;
        user.cancelCount = 0;
        user.totalCount = 0;

        let listOrders = [];

        const addressUser = await db.AddressUser.findAll({
          where: { userId: user.id },
          raw: true,
        });

        for (const address of addressUser) {
          let orderProduct = await db.OrderProduct.findAll({
            where: {
              addressUserId: address.id,
            },
          });

          orderProduct = orderProduct.filter((item) => {
            if (data.type == "day") {
              let updatedAt = moment
                .utc(item.updatedAt)
                .format("DD/MM/YYYY")
                .split("/");
              updatedAt = Number(updatedAt[2] + updatedAt[1] + updatedAt[0]);

              let twoDate = moment(data.twoDate)
                .format("DD/MM/YYYY")
                .split("/");
              twoDate = Number(twoDate[2] + twoDate[1] + twoDate[0]);
              let oneDate = moment(data.oneDate)
                .format("DD/MM/YYYY")
                .split("/");
              oneDate = Number(oneDate[2] + oneDate[1] + oneDate[0]);

              if (updatedAt >= oneDate && updatedAt <= twoDate) {
                return true;
              }
            } else if (data.type == "month") {
              const updatedAtMonth = moment.utc(item.updatedAt).format("M");
              const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
              if (
                moment(data.oneDate).format("M") == updatedAtMonth &&
                moment(data.oneDate).format("YYYY") == updatedAtYear
              ) {
                return true;
              }
            } else {
              const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
              if (moment(data.oneDate).format("YYYY") == updatedAtYear) {
                return true;
              }
            }
          });

          listOrders = [...listOrders, ...orderProduct];
        }

        for (const order of listOrders) {
          if (order.statusId === "S6") user.successCount++;
          if (order.statusId === "S7") user.cancelCount++;
          user.totalCount++;
        }

        user.cancelRate =
          Math.round((user.cancelCount / user.totalCount) * 100) / 100;
        user.successRate =
          Math.round((user.successCount / user.totalCount) * 100) / 100;
      }

      // lọc user không có order
      allUser = allUser.filter((user) => user.successCount || user.cancelCount);

      // sort array object
      allUser.sort((a, b) => {
        // return a.cancelRate - b.cancelRate; // ASC
        return b.cancelRate - a.cancelRate; // DESC
      });

      resolve({
        errCode: 0,
        data: allUser,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getStatisticSoldProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
        include: [
          { model: db.Allcode, as: "sizeData", attributes: ["value", "code"] },
        ],
        raw: true,
        nest: true,
      };

      const res = await db.ProductDetailSize.findAndCountAll(objectFilter);

      for (let i = 0; i < res.rows.length; i++) {
        res.rows[i].productDetaildData = await db.ProductDetail.findOne({
          where: { id: res.rows[i].productdetailId },
        });
        res.rows[i].productData = await db.Product.findOne({
          where: { id: res.rows[i].productDetaildData.productId },
          include: [
            {
              model: db.Allcode,
              as: "brandData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "categoryData",
              attributes: ["value", "code"],
            },
            {
              model: db.Allcode,
              as: "statusData",
              attributes: ["value", "code"],
            },
          ],
          raw: true,
          nest: true,
        });

        let orderDetail = await db.OrderDetail.findAll({
          where: { productId: res.rows[i].id },
        });

        orderDetail = orderDetail.filter((item) => {
          if (data.type == "day") {
            let updatedAt = moment
              .utc(item.updatedAt)
              .format("DD/MM/YYYY")
              .split("/");
            updatedAt = Number(updatedAt[2] + updatedAt[1] + updatedAt[0]);

            let twoDate = moment(data.twoDate).format("DD/MM/YYYY").split("/");
            twoDate = Number(twoDate[2] + twoDate[1] + twoDate[0]);
            let oneDate = moment(data.oneDate).format("DD/MM/YYYY").split("/");
            oneDate = Number(oneDate[2] + oneDate[1] + oneDate[0]);

            if (updatedAt >= oneDate && updatedAt <= twoDate) {
              return true;
            }
          } else if (data.type == "month") {
            const updatedAtMonth = moment.utc(item.updatedAt).format("M");
            const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
            if (
              moment(data.oneDate).format("M") == updatedAtMonth &&
              moment(data.oneDate).format("YYYY") == updatedAtYear
            ) {
              return true;
            }
          } else {
            const updatedAtYear = moment.utc(item.updatedAt).format("YYYY");
            if (moment(data.oneDate).format("YYYY") == updatedAtYear) {
              return true;
            }
          }
        });

        let sold = 0;
        for (let k = 0; k < orderDetail.length; k++) {
          const order = await db.OrderProduct.findOne({
            where: { id: orderDetail[k].orderId },
          });
          if (order.statusId !== "S7") {
            sold = sold + orderDetail[k].quantity;
          }
        }
        res.rows[i].sold = sold;
      }

      if (data?.sortby === "ASC") res.rows.sort((a, b) => a.sold - b.sold);
      else res.rows.sort((a, b) => b.sold - a.sold);

      const limit = data?.limit || 10;
      const topProducts = [...res.rows.slice(0, limit)];
      let arrayLable = [];
      let arrayValue = [];
      for (let i = 0; i < topProducts.length; i++) {
        const name = `${topProducts[i].productData.name} - ${topProducts[i].productDetaildData.nameDetail} - ${topProducts[i].sizeData.value}`;
        arrayLable.push(name);
        arrayValue.push(topProducts[i].sold);
      }

      const objectCount = {
        arrayLable,
        arrayValue,
      };

      resolve({
        errCode: 0,
        data: objectCount,
        count: topProducts.length,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCountCardStatistic,
  getCountStatusOrder,
  getStatisticByMonth,
  getStatisticByDay,
  getStatisticOverturn,
  getStatisticProfit,
  getStatisticStockProduct,
  getUserCancelOrderRateStatistic,
  getStatisticSoldProduct,
};
