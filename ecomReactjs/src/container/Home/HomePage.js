import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";
import {
  getAllBanner,
  getNewBlog,
  getProductFeatureService,
  getProductNewService,
  getProductRecommendService,
} from "../../services/userService";

import HomeBanner from "../../component/HomeFeature/HomeBanner";
import HomeBlog from "../../component/HomeFeature/HomeBlog";
import MainFeature from "../../component/HomeFeature/MainFeature";
import NewProductFeature from "../../component/HomeFeature/NewProductFeature";
import ProductFeature from "../../component/HomeFeature/ProductFeature";
import Slider from "react-slick";

function HomePage(props) {
  const [dataProductFeature, setDataProductFeature] = useState([]);
  const [dataNewProductFeature, setNewProductFeature] = useState([]);
  const [dataNewBlog, setdataNewBlog] = useState([]);
  const [dataBanner, setdataBanner] = useState([]);
  const [dataProductRecommend, setdataProductRecommend] = useState([]);
  let settings = {
    dots: false,
    Infinity: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    autoplay: true,
    cssEase: "linear",
    useTransform: true,
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      fetchProductRecommend(userData.id);
    }
    fetchBlogFeature();
    fetchDataBrand();
    fetchProductFeature();
    fetchProductNew();

    window.scrollTo(0, 0);
  }, []);
  let fetchBlogFeature = async () => {
    let res = await getNewBlog(3);
    if (res && res.errCode === 0) {
      setdataNewBlog(res.data);
    }
  };
  let fetchProductFeature = async () => {
    let res = await getProductFeatureService(6);
    if (res && res.errCode === 0) {
      setDataProductFeature(res.data);
    }
  };
  let fetchProductRecommend = async (userId) => {
    let res = await getProductRecommendService({
      limit: 20,
      userId: userId,
    });
    if (res && res.errCode === 0) {
      setdataProductRecommend(res.data);
    }
  };
  let fetchDataBrand = async () => {
    let res = await getAllBanner({
      limit: 6,
      offset: 0,
      keyword: "",
    });
    if (res && res.errCode === 0) {
      setdataBanner(res.data);
    }
  };
  let fetchProductNew = async () => {
    let res = await getProductNewService(8);
    if (res && res.errCode === 0) {
      setNewProductFeature(res.data);
    }
  };
  return (
    <div>
      <Slider {...settings}>
        {dataBanner &&
          dataBanner.length > 0 &&
          dataBanner.map((item, index) => {
            return (
              <HomeBanner image={item.image} name={item.name}></HomeBanner>
            );
          })}
      </Slider>

      {/* <MainFeature></MainFeature> */}
      {dataProductRecommend && dataProductRecommend.length > 3 && (
        <ProductFeature
          title={"Gợi ý sản phẩm"}
          data={dataProductRecommend}
        ></ProductFeature>
      )}
      <ProductFeature
        title={"Sản phẩm đặc trưng"}
        data={dataProductFeature}
      ></ProductFeature>
      <NewProductFeature
        title="Sản phẩm mới"
        data={dataNewProductFeature}
      ></NewProductFeature>
      <HomeBlog data={dataNewBlog} />
    </div>
  );
}

export default HomePage;
