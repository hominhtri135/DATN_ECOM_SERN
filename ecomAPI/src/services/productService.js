require("dotenv").config();
const db = require("../models/index");
let jsrecommender = require("js-recommender");
let { Op } = require("sequelize");
function dynamicSort(property, sort) {
  console.log("dynamicSort:property:::", { property, sort });
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    let result = 0;
    if (sort === "ASC") {
      /// sap xep tang dan
      result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    }
    if (sort === "DESC") {
      /// sap xep giam dan
      result =
        a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    }

    return result * sortOrder;
  };
}
function dynamicSortMultiple() {
  const props = arguments;
  console.log("dynamicSortMultiple:Props:::", props);
  return function (obj1, obj2) {
    const result = dynamicSort(props[0], props[1])(obj1, obj2);

    return result;
  };
}
// function dynamicSortMultiple() {
//   const props = arguments;
//   console.log("dynamicSortMultiple:Props:::", props);
//   return function (obj1, obj2) {
//     const i = 0,
//       result = 0,
//       numberOfProperties = props.length;
//     /* try getting a different result from 0 (equal)
//      * as long as we have extra properties to compare
//      */
//     while (result === 0 && i < numberOfProperties) {
//       result = dynamicSort(props[i])(obj1, obj2);
//       i++;
//     }
//     return result;
//   };
// }

const createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.categoryId ||
        !data.brandId ||
        !data.image ||
        !data.nameDetail
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const product = await db.Product.create({
          name: data.name,
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          statusId: "S1",
          categoryId: data.categoryId,
          madeby: data.madeby,
          material: data.material,
          brandId: data.brandId,
        });
        if (product) {
          const productdetail = await db.ProductDetail.create({
            productId: product.id,

            description: data.description,

            originalPrice: data.originalPrice,
            discountPrice: data.discountPrice,
            nameDetail: data.nameDetail,
          });
          if (productdetail) {
            await db.ProductImage.create({
              productdetailId: productdetail.id,
              image: data.image,
            });
            await db.ProductDetailSize.create({
              productdetailId: productdetail.id,
              width: data.width,
              height: data.height,
              sizeId: data.sizeId,
              weight: data.weight,
            });
          }
        }
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
const getAllProductAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
        include: [
          { model: db.Allcode, as: "brandData", attributes: ["value", "code"] },
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
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }

      if (data.categoryId && data.categoryId !== "ALL")
        objectFilter.where = { categoryId: data.categoryId };
      if (data.brandId && data.brandId !== "ALL")
        objectFilter.where = { ...objectFilter.where, brandId: data.brandId };
      if (data.sortName === "true") objectFilter.order = [["name", "ASC"]];
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          name: { [Op.substring]: data.keyword },
        };

      const res = await db.Product.findAndCountAll(objectFilter);
      for (let i = 0; i < res.rows.length; i++) {
        const objectFilterProductDetail = {
          where: { productId: res.rows[i].id },
          raw: true,
        };

        res.rows[i].productDetail = await db.ProductDetail.findAll(
          objectFilterProductDetail
        );

        for (let j = 0; j < res.rows[i].productDetail.length; j++) {
          res.rows[i].productDetail[j].productDetailSize =
            await db.ProductDetailSize.findAll({
              where: { productdetailId: res.rows[i].productDetail[j].id },
              raw: true,
            });

          res.rows[i].price = res.rows[i].productDetail[0].discountPrice;
          res.rows[i].productDetail[j].productImage =
            await db.ProductImage.findAll({
              where: { productdetailId: res.rows[i].productDetail[j].id },
              raw: true,
            });
          for (
            let k = 0;
            k < res.rows[i].productDetail[j].productImage.length > 0;
            k++
          ) {
            res.rows[i].productDetail[j].productImage[k].image = Buffer.from(
              res.rows[i].productDetail[j].productImage[k].image,
              "base64"
            ).toString("binary");
          }
        }
      }
      if (data.sortPrice && data.sortPrice === "ASC") {
        res.rows.sort(dynamicSortMultiple("price", "ASC"));
      }
      if (data.sortPrice && data.sortPrice === "DESC") {
        res.rows.sort(dynamicSortMultiple("price", "DESC"));
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
const getAllProductUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objectFilter = {
        where: { statusId: "S1" },
        include: [
          { model: db.Allcode, as: "brandData", attributes: ["value", "code"] },
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
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      };
      if (data.limit && data.offset) {
        objectFilter.limit = +data.limit;
        objectFilter.offset = +data.offset;
      }

      if (data.categoryId && data.categoryId !== "ALL")
        objectFilter.where = { categoryId: data.categoryId };
      if (data.brandId && data.brandId !== "ALL")
        objectFilter.where = { ...objectFilter.where, brandId: data.brandId };
      if (data.sortName === "true") objectFilter.order = [["name", "ASC"]];
      if (data.keyword !== "")
        objectFilter.where = {
          ...objectFilter.where,
          name: { [Op.substring]: data.keyword },
        };

      const res = await db.Product.findAndCountAll(objectFilter);
      for (let i = 0; i < res.rows.length; i++) {
        const objectFilterProductDetail = {
          where: { productId: res.rows[i].id },
          raw: true,
        };

        res.rows[i].productDetail = await db.ProductDetail.findAll(
          objectFilterProductDetail
        );

        for (let j = 0; j < res.rows[i].productDetail.length; j++) {
          res.rows[i].productDetail[j].productDetailSize =
            await db.ProductDetailSize.findAll({
              where: { productdetailId: res.rows[i].productDetail[j].id },
              raw: true,
            });

          res.rows[i].price = res.rows[i].productDetail[0].discountPrice;
          res.rows[i].productDetail[j].productImage =
            await db.ProductImage.findAll({
              where: { productdetailId: res.rows[i].productDetail[j].id },
              raw: true,
            });
          for (
            let k = 0;
            k < res.rows[i].productDetail[j].productImage.length > 0;
            k++
          ) {
            res.rows[i].productDetail[j].productImage[k].image = Buffer.from(
              res.rows[i].productDetail[j].productImage[k].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      if (data.sortPrice && data.sortPrice === "ASC") {
        res.rows.sort(dynamicSortMultiple("price", "ASC"));
      }
      if (data.sortPrice && data.sortPrice === "DESC") {
        res.rows.sort(dynamicSortMultiple("price", "DESC"));
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
const UnactiveProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const product = await db.Product.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (!product) {
          resolve({
            errCode: 2,
            errMessage: `The product isn't exist`,
          });
        } else {
          product.statusId = "S2";
          await product.save();
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
const ActiveProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const product = await db.Product.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (!product) {
          resolve({
            errCode: 2,
            errMessage: `The product isn't exist`,
          });
        } else {
          product.statusId = "S1";
          await product.save();
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
const getDetailProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const res = await db.Product.findOne({
          where: { id: id },
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
        const product = await db.Product.findOne({
          where: { id: id },
          raw: false,
        });
        product.view = product.view + 1;
        await product.save();

        res.productDetail = await db.ProductDetail.findAll({
          where: { productId: res.id },
        });
        for (let i = 0; i < res.productDetail.length > 0; i++) {
          res.productDetail[i].productImage = await db.ProductImage.findAll({
            where: { productdetailId: res.productDetail[i].id },
          });

          res.productDetail[i].productDetailSize =
            await db.ProductDetailSize.findAll({
              where: { productdetailId: res.productDetail[i].id },
              include: [
                {
                  model: db.Allcode,
                  as: "sizeData",
                  attributes: ["value", "code"],
                },
              ],
              raw: true,
              nest: true,
            });
          for (let j = 0; j < res.productDetail[i].productImage.length; j++) {
            res.productDetail[i].productImage[j].image = Buffer.from(
              res.productDetail[i].productImage[j].image,
              "base64"
            ).toString("binary");
          }
          for (
            let k = 0;
            k < res.productDetail[i].productDetailSize.length;
            k++
          ) {
            const receiptDetail = await db.ReceiptDetail.findAll({
              where: {
                productDetailSizeId:
                  res.productDetail[i].productDetailSize[k].id,
              },
            });
            const orderDetail = await db.OrderDetail.findAll({
              where: {
                productId: res.productDetail[i].productDetailSize[k].id,
              },
            });
            let quantity = 0;
            for (let g = 0; g < receiptDetail.length; g++) {
              quantity = quantity + receiptDetail[g].quantity;
            }
            for (let h = 0; h < orderDetail.length; h++) {
              const order = await db.OrderProduct.findOne({
                where: { id: orderDetail[h].orderId },
              });
              if (order.statusId != "S7") {
                quantity = quantity - orderDetail[h].quantity;
              }
            }

            res.productDetail[i].productDetailSize[k].stock = quantity;
          }
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
const updateProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.categoryId || !data.brandId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const product = await db.Product.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (product) {
          product.name = data.name;
          product.material = data.material;
          product.madeby = data.madeby;
          product.brandId = data.brandId;
          product.categoryId = data.categoryId;
          product.contentMarkdown = data.contentMarkdown;
          product.contentHTML = data.contentHTML;

          await product.save();
          resolve({
            errCode: 0,
            errMessage: "",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllProductDetailById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.limit || !data.offset) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productdetail = await db.ProductDetail.findAndCountAll({
          where: { productId: data.id },
          order: [["nameDetail", "ASC"]],
          limit: +data.limit,
          offset: +data.offset,
        });
        if (productdetail.rows && productdetail.rows.length > 0) {
          for (let i = 0; i < productdetail.rows.length; i++) {
            productdetail.rows[i].productImageData =
              await db.ProductImage.findAll({
                where: { productdetailId: productdetail.rows[i].id },
              });
            productdetail.rows[i].productsize =
              await db.ProductDetailSize.findAll({
                where: { productdetailId: productdetail.rows[i].id },
              });
            if (
              productdetail.rows[i].productImageData &&
              productdetail.rows[i].productImageData.length > 0
            ) {
              for (
                let j = 0;
                j < productdetail.rows[i].productImageData.length > 0;
                j++
              ) {
                productdetail.rows[i].productImageData[j].image = Buffer.from(
                  productdetail.rows[i].productImageData[j].image,
                  "base64"
                ).toString("binary");
              }
            }
          }
        }
        resolve({
          errCode: 0,
          data: productdetail.rows,
          count: productdetail.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllProductDetailImageById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.limit || !data.offset) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productImage = await db.ProductImage.findAndCountAll({
          where: { productdetailId: data.id },
          limit: +data.limit,
          offset: +data.offset,
        });
        if (productImage.rows && productImage.rows.length > 0) {
          productImage.rows.map(
            (item) =>
              (item.image = Buffer.from(item.image, "base64").toString(
                "binary"
              ))
          );
        }

        resolve({
          errCode: 0,
          data: productImage.rows,
          count: productImage.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const createNewProductDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.image ||
        !data.nameDetail ||
        !data.originalPrice ||
        !data.discountPrice ||
        !data.id
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productdetail = await db.ProductDetail.create({
          productId: data.id,
          description: data.description,
          originalPrice: data.originalPrice,
          discountPrice: data.discountPrice,
          nameDetail: data.nameDetail,
        });
        if (productdetail) {
          await db.ProductImage.create({
            productdetailId: productdetail.id,
            image: data.image,
          });
          await db.ProductDetailSize.create({
            productdetailId: productdetail.id,
            width: data.width,
            height: data.height,
            sizeId: data.sizeId,
            weight: data.weight,
          });
        }
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
const updateProductDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.nameDetail ||
        !data.originalPrice ||
        !data.discountPrice ||
        !data.id
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productDetail = await db.ProductDetail.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (productDetail) {
          productDetail.nameDetail = data.nameDetail;
          productDetail.originalPrice = data.originalPrice;
          productDetail.discountPrice = data.discountPrice;
          productDetail.description = data.description;
          await productDetail.save();
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Product not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailProductDetailById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productdetail = await db.ProductDetail.findOne({
          where: { id: id },
        });

        resolve({
          errCode: 0,
          data: productdetail,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const createNewProductDetailImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.image || !data.caption || !data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.ProductImage.create({
          productdetailId: data.id,
          caption: data.caption,
          image: data.image,
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
const getDetailProductImageById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productdetailImage = await db.ProductImage.findOne({
          where: { id: id },
        });
        if (productdetailImage) {
          productdetailImage.image = Buffer.from(
            productdetailImage.image,
            "base64"
          ).toString("binary");
        }
        resolve({
          errCode: 0,
          data: productdetailImage,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateProductDetailImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.caption || !data.image) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productImage = await db.ProductImage.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (productImage) {
          productImage.caption = data.caption;
          productImage.image = data.image;

          await productImage.save();
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Product Image not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProductDetailImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productImage = await db.ProductImage.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (productImage) {
          await db.ProductImage.destroy({
            where: { id: data.id },
          });
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Product Image not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProductDetail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productDetail = await db.ProductDetail.findOne({
          where: { id: data.id },
        });
        if (productDetail) {
          await db.ProductDetail.destroy({
            where: { id: data.id },
          });

          const productImg = await db.ProductImage.findOne({
            where: { productdetailId: data.id },
          });
          const productSize = await db.ProductDetailSize.findOne({
            where: { productdetailId: data.id },
          });
          if (productImg) {
            await db.ProductImage.destroy({
              where: { productdetailId: data.id },
            });
          }
          if (productSize) {
            await db.ProductDetailSize.destroy({
              where: { productdetailId: data.id },
            });
          }
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Product Image not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllProductDetailSizeById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.limit || !data.offset) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const productsize = await db.ProductDetailSize.findAndCountAll({
          where: { productdetailId: data.id },
          limit: +data.limit,
          offset: +data.offset,
          include: [
            {
              model: db.Allcode,
              as: "sizeData",
              attributes: ["value", "code"],
            },
          ],
          raw: true,
          nest: true,
        });
        for (let i = 0; i < productsize.rows.length > 0; i++) {
          const receiptDetail = await db.ReceiptDetail.findAll({
            where: { productDetailSizeId: productsize.rows[i].id },
          });
          const orderDetail = await db.OrderDetail.findAll({
            where: { productId: productsize.rows[i].id },
          });
          let quantity = 0;
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

          productsize.rows[i].stock = quantity;
        }
        resolve({
          errCode: 0,
          data: productsize.rows,
          count: productsize.count,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const createNewProductDetailSize = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.productdetailId || !data.sizeId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.ProductDetailSize.create({
          productdetailId: data.productdetailId,
          sizeId: data.sizeId,
          width: data.width,
          height: data.height,
          weight: data.weight,
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
const getDetailProductDetailSizeById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const res = await db.ProductDetailSize.findOne({
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
const updateProductDetailSize = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.sizeId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const res = await db.ProductDetailSize.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (res) {
          res.sizeId = data.sizeId;
          res.width = data.width;
          res.height = data.height;

          res.weight = data.weight;
          await res.save();
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Product Image not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProductDetailSize = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const res = await db.ProductDetailSize.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (res) {
          await db.ProductDetailSize.destroy({
            where: { id: data.id },
          });
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Product Image not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getProductFeature = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Product.findAll({
        include: [
          { model: db.Allcode, as: "brandData", attributes: ["value", "code"] },
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

        limit: +limit,
        order: [["view", "DESC"]],
        raw: true,
        nest: true,
      });
      for (let i = 0; i < res.length; i++) {
        const objectFilterProductDetail = {
          where: { productId: res[i].id },
          raw: true,
        };

        res[i].productDetail = await db.ProductDetail.findAll(
          objectFilterProductDetail
        );

        for (let j = 0; j < res[i].productDetail.length; j++) {
          res[i].productDetail[j].productDetailSize =
            await db.ProductDetailSize.findAll({
              where: { productdetailId: res[i].productDetail[j].id },
              raw: true,
            });

          res[i].price = res[i].productDetail[0].discountPrice;
          res[i].productDetail[j].productImage = await db.ProductImage.findAll({
            where: { productdetailId: res[i].productDetail[j].id },
            raw: true,
          });
          for (
            let k = 0;
            k < res[i].productDetail[j].productImage.length > 0;
            k++
          ) {
            res[i].productDetail[j].productImage[k].image = Buffer.from(
              res[i].productDetail[j].productImage[k].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      resolve({
        errCode: 0,
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getProductNew = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Product.findAll({
        include: [
          { model: db.Allcode, as: "brandData", attributes: ["value", "code"] },
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
        limit: +limit,
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      for (let i = 0; i < res.length; i++) {
        const objectFilterProductDetail = {
          where: { productId: res[i].id },
          raw: true,
        };

        res[i].productDetail = await db.ProductDetail.findAll(
          objectFilterProductDetail
        );

        for (let j = 0; j < res[i].productDetail.length; j++) {
          res[i].productDetail[j].productDetailSize =
            await db.ProductDetailSize.findAll({
              where: { productdetailId: res[i].productDetail[j].id },
              raw: true,
            });

          res[i].price = res[i].productDetail[0].discountPrice;
          res[i].productDetail[j].productImage = await db.ProductImage.findAll({
            where: { productdetailId: res[i].productDetail[j].id },
            raw: true,
          });
          for (
            let k = 0;
            k < res[i].productDetail[j].productImage.length > 0;
            k++
          ) {
            res[i].productDetail[j].productImage[k].image = Buffer.from(
              res[i].productDetail[j].productImage[k].image,
              "base64"
            ).toString("binary");
          }
        }
      }

      resolve({
        errCode: 0,
        data: res,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getProductShopCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productArr = [];
      if (!data.userId && !data.limit) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const shopcart = await db.ShopCart.findAll({
          where: { userId: data.userId },
        });

        for (let i = 0; i < shopcart.length; i++) {
          const productDetailSize = await db.ProductDetailSize.findOne({
            where: { id: shopcart[i].productdetailsizeId },
          });

          const productDetail = await db.ProductDetail.findOne({
            where: { id: productDetailSize.productdetailId },
          });

          const product = await db.Product.findOne({
            where: { id: productDetail.productId },
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

            limit: +data.limit,
            order: [["view", "DESC"]],
            raw: true,
            nest: true,
          });
          productArr.push(product);
        }

        if (productArr && productArr.length > 0) {
          for (let g = 0; g < productArr.length; g++) {
            const objectFilterProductDetail = {
              where: { productId: productArr[g].id },
              raw: true,
            };

            productArr[g].productDetail = await db.ProductDetail.findAll(
              objectFilterProductDetail
            );

            for (let j = 0; j < productArr[g].productDetail.length; j++) {
              productArr[g].productDetail[j].productDetailSize =
                await db.ProductDetailSize.findAll({
                  where: { productdetailId: productArr[g].productDetail[j].id },
                  raw: true,
                });

              productArr[g].price =
                productArr[g].productDetail[0].discountPrice;
              productArr[g].productDetail[j].productImage =
                await db.ProductImage.findAll({
                  where: { productdetailId: productArr[g].productDetail[j].id },
                  raw: true,
                });
              for (
                let k = 0;
                k < productArr[g].productDetail[j].productImage.length > 0;
                k++
              ) {
                productArr[g].productDetail[j].productImage[k].image =
                  Buffer.from(
                    productArr[g].productDetail[j].productImage[k].image,
                    "base64"
                  ).toString("binary");
              }
            }
          }
        }
      }

      resolve({
        errCode: 0,
        data: productArr,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getProductRecommend = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productArr = [];
      if (!data.userId && !data.limit) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        const recommender = new jsrecommender.Recommender();

        const table = new jsrecommender.Table();
        const rateList = await db.Comment.findAll({
          where: {
            star: { [Op.not]: null },
          },
        });

        for (let i = 0; i < rateList.length; i++) {
          table.setCell(
            `${rateList[i].productId}`,
            `${rateList[i].userId}`,
            rateList[i].star
          );
        }
        const model = recommender.fit(table);
        const predicted_table = recommender.transform(table);

        for (let i = 0; i < predicted_table.columnNames.length; ++i) {
          const user = predicted_table.columnNames[i];

          for (let j = 0; j < predicted_table.rowNames.length; ++j) {
            const product = predicted_table.rowNames[j];
            if (
              user === data.userId &&
              Math.round(predicted_table.getCell(product, user)) > 3
            ) {
              const productdata = await db.Product.findOne({
                where: { id: product },
              });
              if (productArr.length == +data.limit) {
                break;
              } else {
                const dataValues = productdata.dataValues;
                const productObject = { ...dataValues };
                productArr.push(productObject);
              }
            }
          }
        }
        if (productArr && productArr.length > 0) {
          for (let g = 0; g < productArr.length; g++) {
            const objectFilterProductDetail = {
              where: { productId: productArr[g].id },
              raw: true,
            };

            productArr[g].productDetail = await db.ProductDetail.findAll(
              objectFilterProductDetail
            );

            for (let j = 0; j < productArr[g].productDetail.length; j++) {
              productArr[g].productDetail[j].productDetailSize =
                await db.ProductDetailSize.findAll({
                  where: { productdetailId: productArr[g].productDetail[j].id },
                  raw: true,
                });

              productArr[g].price =
                productArr[g].productDetail[0].discountPrice;
              productArr[g].productDetail[j].productImage =
                await db.ProductImage.findAll({
                  where: { productdetailId: productArr[g].productDetail[j].id },
                  raw: true,
                });
              for (
                let k = 0;
                k < productArr[g].productDetail[j].productImage.length > 0;
                k++
              ) {
                productArr[g].productDetail[j].productImage[k].image =
                  Buffer.from(
                    productArr[g].productDetail[j].productImage[k].image,
                    "base64"
                  ).toString("binary");
              }
            }
          }
        }

        resolve({
          errCode: 0,
          data: productArr,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewProduct: createNewProduct,
  getAllProductAdmin: getAllProductAdmin,
  getAllProductUser: getAllProductUser,
  UnactiveProduct: UnactiveProduct,
  ActiveProduct: ActiveProduct,
  getDetailProductById: getDetailProductById,
  updateProduct: updateProduct,
  getAllProductDetailById: getAllProductDetailById,
  getAllProductDetailImageById: getAllProductDetailImageById,
  createNewProductDetail: createNewProductDetail,
  updateProductDetail: updateProductDetail,
  getDetailProductDetailById: getDetailProductDetailById,
  createNewProductDetailImage: createNewProductDetailImage,
  getDetailProductImageById: getDetailProductImageById,
  updateProductDetailImage: updateProductDetailImage,
  deleteProductDetailImage: deleteProductDetailImage,
  deleteProductDetail: deleteProductDetail,
  getAllProductDetailSizeById: getAllProductDetailSizeById,
  createNewProductDetailSize: createNewProductDetailSize,
  getDetailProductDetailSizeById: getDetailProductDetailSizeById,
  updateProductDetailSize: updateProductDetailSize,
  deleteProductDetailSize: deleteProductDetailSize,
  getProductFeature: getProductFeature,
  getProductNew: getProductNew,
  getProductShopCart: getProductShopCart,
  getProductRecommend: getProductRecommend,
};
