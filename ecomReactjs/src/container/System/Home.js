import "react-datepicker/dist/react-datepicker.css";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import {
  getCountCardStatistic,
  getCountStatusOrder,
  getRateOrderUserStatistic,
  getStaticSoldProduct,
  getStatisticByDay,
  getStatisticByMonth,
} from "../../services/userService";

import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

let getOptions = (title) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
};

const Home = () => {
  const [CountCard, setCountCard] = useState({});
  const [rateOrder, setRateOrder] = useState({});
  const [CountStatusOrder, setCountStatusOrder] = useState({});
  const [StatisticOrderByMonth, setStatisticOrderByMonth] = useState({});
  const [StatisticOrderByDay, setStatisticOrderByDay] = useState({});
  const [StatisticLowSellingProduct, setStatisticLowSellingProduct] = useState(
    {}
  );
  const [StatisticBestSellingProduct, setStatisticBestSellingProduct] =
    useState({});
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [DateTime, setDateTime] = useState(new Date());
  const [type, settype] = useState("month");
  const [month, setmonth] = useState(new Date());
  const [year, setyear] = useState(new Date());
  useEffect(() => {
    loadRateOrder();
    loadCountCard();
    loadStatusOrder();
    loadBestSellingProduct();
    loadLowSellingProduct();
    loadStatisticOrderByMonth(moment(year).format("YYYY"));
    loadStatisticOrderByDay(
      moment(year).format("YYYY"),
      moment(new Date()).format("M")
    );
  }, []);
  console.log("ADMIN:::", {
    rateOrder,
    CountCard,
    CountStatusOrder,
    StatisticOrderByMonth,
    StatisticOrderByDay,
  });

  const dataPie = {
    labels: CountStatusOrder.arrayLable,
    datasets: [
      {
        label: "# of Votes",
        data: CountStatusOrder.arrayValue,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataLine = {
    labels: StatisticOrderByMonth.arrayMonthLable,
    datasets: [
      {
        label: "Doanh thu",
        data: StatisticOrderByMonth.arrayMonthValue,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const dataBar = {
    labels: StatisticOrderByDay.arrayDayLable,
    datasets: [
      {
        label: "Doanh thu",
        data: StatisticOrderByDay.arrayDayValue,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const dataBarBestSellingProduct = {
    labels: StatisticBestSellingProduct.arrayLable,
    datasets: [
      {
        minBarLength: 2,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        label: "Sản phẩm đã bán",
        data: StatisticBestSellingProduct.arrayValue,
      },
    ],
  };
  const dataBarLowSellingProduct = {
    labels: StatisticLowSellingProduct.arrayLable,
    datasets: [
      {
        minBarLength: 2,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        label: "Sản phẩm đã bán",
        data: StatisticLowSellingProduct.arrayValue,
      },
    ],
  };

  let loadRateOrder = async () => {
    let res = await getRateOrderUserStatistic({
      oneDate: type === "day" ? startDate : DateTime,
      twoDate: endDate,
      type: type,
    });
    if (res && res.errCode === 0) {
      setRateOrder(res.data);
    }
  };
  let loadBestSellingProduct = async () => {
    let res = await getStaticSoldProduct({
      oneDate: type === "day" ? startDate : DateTime,
      twoDate: endDate,
      type: type,
      sortby: "DESC",
      limit: 20,
    });
    if (res && res.errCode === 0) {
      setStatisticBestSellingProduct(res.data);
    }
  };
  let loadLowSellingProduct = async () => {
    let res = await getStaticSoldProduct({
      oneDate: type === "day" ? startDate : DateTime,
      twoDate: endDate,
      type: type,
      sortby: "ASC",
      limit: 20,
    });
    if (res && res.errCode === 0) {
      setStatisticLowSellingProduct(res.data);
    }
  };

  let loadStatusOrder = async () => {
    let res = await getCountStatusOrder({
      oneDate: type === "day" ? startDate : DateTime,
      twoDate: endDate,
      type: type,
    });
    if (res && res.errCode === 0) {
      setCountStatusOrder(res.data);
    }
  };

  let loadCountCard = async () => {
    let res = await getCountCardStatistic();
    if (res && res.errCode == 0) {
      setCountCard(res.data);
    }
  };
  let handleOnclick = () => {
    loadStatusOrder();
    loadRateOrder();
    loadBestSellingProduct();
    loadLowSellingProduct();
  };
  let loadStatisticOrderByMonth = async (year) => {
    let res = await getStatisticByMonth(year);
    if (res && res.errCode === 0) {
      setStatisticOrderByMonth(res.data);
    }
  };
  let loadStatisticOrderByDay = async (year, month) => {
    let res = await getStatisticByDay({ year, month });
    if (res && res.errCode === 0) {
      setStatisticOrderByDay(res.data);
    }
  };
  let handleOnChangeYear = (year) => {
    setyear(year);
    loadStatisticOrderByMonth(moment(year).format("YYYY"));
  };
  let handleOnChangeDatePickerFromDate = (date) => {
    setmonth(date);
    loadStatisticOrderByDay(
      moment(date).format("YYYY"),
      moment(date).format("M")
    );
  };
  return (
    <div className="container-fluid px-5">
      <h1 className="mt-4">THỐNG KÊ</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Trang thống kê</li>
      </ol>
      {/* 1 */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">
              TỔNG SỐ ĐƠN HÀNG ({CountCard.countOrder})
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={"/admin/list-order"}
              >
                Chi tiết
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">ĐÁNH GIÁ ({CountCard.countReview})</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="small text-white stretched-link" href="#">
                Chi tiết
              </a>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">SẢN PHẨM ({CountCard.countProduct})</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={"/admin/list-product"}
              >
                Chi tiết
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-danger text-white mb-4">
            <div className="card-body">THÀNH VIÊN ({CountCard.countUser})</div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={"/admin/list-user"}
              >
                Chi tiết
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className="row">
        <form className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="inputZip">Loại thống kê</label>
            <select
              value={type}
              name="type"
              onChange={(event) => settype(event.target.value)}
              id="inputState"
              className="form-control"
            >
              <option value="day">Ngày</option>
              <option value="month">Tháng</option>
              <option value="year">Năm</option>
            </select>
          </div>
          <div className="form-group col-md-5">
            {type === "day" && (
              <>
                <label htmlFor="inputCity">Chọn ngày</label>
                <DatePicker
                  showMonthDropdown
                  showYearDropdown
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  className="form-control"
                  isClearable={true}
                />
              </>
            )}
            {type === "month" && (
              <>
                <label htmlFor="inputCity">Chọn tháng</label>
                <DatePicker
                  selected={DateTime}
                  onChange={(date) => setDateTime(date)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  className="form-control"
                />
              </>
            )}
            {type === "year" && (
              <>
                <label htmlFor="inputCity">Chọn năm</label>
                <DatePicker
                  selected={DateTime}
                  onChange={(date) => setDateTime(date)}
                  dateFormat="yyyy"
                  showYearPicker
                  className="form-control"
                />
              </>
            )}
          </div>
          <div
            className="form-group col-md-2"
            style={{ marginBlockStart: "auto" }}
          >
            <button
              type="button"
              onClick={() => handleOnclick()}
              className="btn btn-primary w-100"
            >
              Lọc
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1" />
              Danh sách tỷ lệ huỷ đơn của khách hàng
            </div>
            <div className="card-body">
              <div className="table-responsive" style={{ height: "480px" }}>
                <table
                  className="table table-bordered"
                  style={{ border: "1" }}
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Hoàn thành</th>
                      <th>Huỷ</th>
                      <th>Tổng</th>
                      <th>Tỉ lệ huỷ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rateOrder &&
                      rateOrder.length > 0 &&
                      rateOrder.map((item, index) => {
                        return (
                          <tr
                            className={`${
                              item.cancelRate >= 0.5
                                ? "table-danger"
                                : item.cancelRate >= 0.3
                                ? "table-warning"
                                : ""
                            }`}
                          >
                            <td>{index + 1}</td>
                            <td>{`${item?.firstName ? item?.firstName : ""} ${
                              item?.lastName
                            }`}</td>
                            <td>{item.email}</td>
                            <td>{`${item.successCount} đơn`}</td>
                            <td>{`${item.cancelCount} đơn`}</td>
                            <td>{`${item.totalCount} đơn`}</td>
                            <td>{`${Number(item.cancelRate) * 100}%`}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <Pie
            data={dataPie}
            options={getOptions("Thống kê trạng thái đơn hàng")}
          />
        </div>
      </div>

      {/* 3 */}
      <div className="row mt-3">
        <div className="col-md-6">
          <Bar
            options={{
              scales: {
                x: {
                  ticks: {
                    callback: function (value) {
                      let lable = this.getLabelForValue(value)
                        .split(" ")
                        .slice(0, 5)
                        .join(" ");
                      // lable = lable.slice(0, 5).join(" ");
                      return lable + "...";
                    },
                  },
                },
                y: {
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Biểu đồ top 20 sản phẩm bán chạy nhất",
                },
              },
            }}
            data={dataBarBestSellingProduct}
          />
        </div>
        <div className="col-md-6">
          <Bar
            options={{
              scales: {
                x: {
                  ticks: {
                    callback: function (value) {
                      let lable = this.getLabelForValue(value)
                        .split(" ")
                        .slice(0, 5)
                        .join(" ");
                      // lable = lable.slice(0, 5).join(" ");
                      return lable + "...";
                    },
                  },
                },
                y: {
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Biểu đồ top 20 sản phẩm bán chậm nhất",
                },
              },
            }}
            data={dataBarLowSellingProduct}
          />
        </div>
      </div>

      <hr className="my-5" />
      {/* 4 */}
      <div className="row mt-3">
        <div className="col-md-6">
          <label>Chọn năm</label>
          <DatePicker
            selected={year}
            onChange={(date) => handleOnChangeYear(date)}
            dateFormat="yyyy"
            showYearPicker
            className="form-control col-md-2"
          />
          <Line
            options={getOptions("Biểu đồ doanh thu theo từng tháng trong năm")}
            data={dataLine}
          />
        </div>
        <div className="col-md-6">
          <label>Chọn tháng</label>
          <DatePicker
            selected={month}
            onChange={(date) => handleOnChangeDatePickerFromDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="form-control col-md-2"
          />
          <Bar
            options={getOptions("Biểu đồ doanh thu theo từng ngày trong tháng")}
            data={dataBar}
          />
        </div>
      </div>
      {/* <div className="row"></div> */}
    </div>
  );
};
export default Home;
