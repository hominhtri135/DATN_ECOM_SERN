import "./css/App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import BlogPage from "./container/Blog/BlogPage";
import DetailBlog from "./container/Blog/DetailBlog";
import DetailProductPage from "./container/DetailProduct/DetailProductPage";
import Footer from "./container/Footer/Footer";
import Header from "./container/Header/Header";
import HomePage from "./container/Home/HomePage";
import HomePageAdmin from "./container/System/HomePageAdmin";
import LoginWebPage from "./container/Login/LoginWebPage";
import OrderHomePage from "./container/Order/OrderHomePage";
import Otp from "./container/Login/Otp";
import PaymentSuccess from "./container/User/PaymentSuccess";
import React from "react";
import { Redirect } from "react-router";
import ShopCartPage from "./container/ShopCart/ShopCartPage";
import ShopPage from "./container/Shop/ShopPage";
import { ToastContainer } from "react-toastify";
import TopMenu from "./container/Header/TopMenu";
import UserHomePage from "./container/User/UseHomePage";
import VerifyEmail from "./container/System/Email/VerifyEmail";
import VerifyForgotPassword from "./container/System/Email/VerifyForgotPassword";
import VnpayPaymentPage from "./container/Order/VnpayPaymentPage";
import VnpayPaymentSuccess from "./container/Order/VnpayPaymentSuccess";
import VoucherHomePage from "./container/Voucher/VoucherHomePage";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/">
            <Header />
            <HomePage />
            <Footer />
          </Route>
          <Route path="/shop">
            <Header />
            <ShopPage />
            <Footer />
          </Route>
          <Route path="/detail-product/:id">
            <Header />
            <DetailProductPage />
            <Footer />
          </Route>
          <Route
            path="/admin/"
            render={() => {
              if (
                JSON.parse(localStorage.getItem("userData")) &&
                (JSON.parse(localStorage.getItem("userData")).roleId === "R1" ||
                  JSON.parse(localStorage.getItem("userData")).roleId === "R3")
              ) {
                return <HomePageAdmin />;
              } else return <Redirect to={"/"} />;
            }}
          ></Route>
          <Route
            path="/user/"
            render={() => {
              return JSON.parse(localStorage.getItem("userData")) &&
                JSON.parse(localStorage.getItem("userData")) ? (
                <>
                  <Header />
                  <UserHomePage />
                  <Footer />
                </>
              ) : (
                <Redirect to={"/login"} />
              );
            }}
          ></Route>
          <Route path="/shopcart">
            <Header />
            <ShopCartPage />
            <Footer />
          </Route>
          <Route exact path="/payment/success">
            <Header />
            <PaymentSuccess />
            <Footer />
          </Route>
          <Route exact path="/payment/vnpay">
            <TopMenu
              user={
                JSON.parse(localStorage.getItem("userData"))
                  ? JSON.parse(localStorage.getItem("userData"))
                  : ""
              }
            />
            <VnpayPaymentPage />
            <Footer />
          </Route>
          <Route exact path="/payment/vnpay_return">
            <TopMenu
              user={
                JSON.parse(localStorage.getItem("userData"))
                  ? JSON.parse(localStorage.getItem("userData"))
                  : ""
              }
            />
            <VnpayPaymentSuccess />
            <Footer />
          </Route>
          <Route
            path="/login"
            render={() => {
              return JSON.parse(localStorage.getItem("userData")) ? (
                <Redirect to={"/"} />
              ) : (
                <>
                  <Header />
                  <LoginWebPage />
                  <Footer />
                </>
              );
            }}
          ></Route>
          <Route path="/voucher">
            <Header />
            <VoucherHomePage />
            <Footer />
          </Route>
          <Route path="/blog">
            <Header />
            <BlogPage />
            <Footer />
          </Route>
          <Route path="/blog-detail/:id">
            <Header />
            <DetailBlog />
            <Footer />
          </Route>
          <Route path="/about">
            <Header />

            <Footer />
          </Route>

          <Route path="/verify-email">
            <Header />
            <VerifyEmail />
            <Footer />
          </Route>

          <Route path="/verify-forgotpassword">
            <Header />
            <VerifyForgotPassword />
            <Footer />
          </Route>

          <Route path="/order/:userId">
            <TopMenu
              user={
                JSON.parse(localStorage.getItem("userData"))
                  ? JSON.parse(localStorage.getItem("userData"))
                  : ""
              }
            />
            <OrderHomePage />
            <Footer />
          </Route>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
