import "react-toastify/dist/ReactToastify.css";
import "./VerifyEmail.scss";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import React from "react";
import { handleVerifyEmail } from "../../../services/userService";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [status, setstatus] = useState(false);

  useEffect(() => {
    let token = getParam("token");
    let id = getParam("userId");
    let fetchVerifyEmail = async () => {
      let res = await handleVerifyEmail({
        token: token,
        id: id,
      });
      console.log(res.errCode);
      if (res.errCode === 0) {
        setstatus(true);
      }
    };
    fetchVerifyEmail();
  });
  let getParam = (param) => {
    let url = new URL(window.location.href);
    return url.searchParams.get(param);
  };
  console.log("check status", status);
  return (
    <div className="container-verify-email">
      <h3 className="text-verify-email">
        {status === true && "Xác thực email thành công !"}
        {status === false && "Email đã được xác thực hoặc không tồn tại !"}
      </h3>
    </div>
  );
};
export default VerifyEmail;
