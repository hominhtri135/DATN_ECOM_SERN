import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import { paymentOrderSuccessService } from "../../services/userService";
import { toast } from "react-toastify";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function PaymentSuccess(props) {
  let query = useQuery();

  useEffect(() => {
    let orderData = JSON.parse(localStorage.getItem("orderData"));
    localStorage.removeItem("orderData");
    if (orderData) {
      orderData.paymentId = query.get("paymentId");
      orderData.token = query.get("token");
      orderData.PayerID = query.get("PayerID");

      createNewOrder(orderData);
    }
  }, []);
  let createNewOrder = async (data) => {
    let res = await paymentOrderSuccessService(data);
    if (res && res.errCode == 0) {
      toast.success("Thanh toán hóa đơn thành công");
      const userData = JSON.parse(localStorage.getItem("userData"));
      setTimeout(() => {
        window.location.href = "/user/order/" + userData.id;
      }, 2000);
    } else {
      toast.error(res.errMessgae);
    }
  };
  return <div style={{ height: "50vh", textAlign: "center" }}></div>;
}

export default PaymentSuccess;
