import "./ChangePassword.scss";

import {
  handleChangePassword,
  handleLoginService,
  handleVerifyForgotPassword,
} from "../../../services/userService";
import { useEffect, useState } from "react";

import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const VerifyForgotPassword = () => {
  const [userId, setuserId] = useState();
  const [token, setToken] = useState();

  const [inputValues, setInputValues] = useState({
    newpassword: "",
    confirmpassword: "",
  });
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSavePassword = async () => {
    if (!inputValues.confirmpassword || !inputValues.newpassword) {
      toast.error("Không được để thông tin trống");
    } else if (inputValues.newpassword !== inputValues.confirmpassword) {
      toast.error("Mật khẩu nhập lại không trùng khớp !");
    } else {
      const res = await handleVerifyForgotPassword({
        id: userId,
        token,
        password: inputValues.confirmpassword,
      });
      if (res && res.errCode === 0) {
        toast.success("Đổi mật khẩu thành công");
        setInputValues({
          ...inputValues,
          ["newpassword"]: "",
          ["confirmpassword"]: "",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        toast.error(res.errMessage);
      }
    }
  };
  const getParam = (param) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(param);
  };
  useEffect(() => {
    setuserId(getParam("userId"));
    setToken(getParam("token"));
  }, []);

  return (
    <div className="container">
      <div className="container-fluid px-4">
        <h4 className="mt-4">Lấy lại mật khẩu</h4>

        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1" />
            Đổi mật khẩu
          </div>
          <div className="card-body">
            <form>
              <div className="form-group col-6">
                <label htmlFor="exampleInputEmail1">Mật khẩu mới</label>
                <input
                  type="password"
                  value={inputValues.newpassword}
                  name="newpassword"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="exampleInputPassword1">Nhập lại mật khẩu</label>
                <input
                  type="password"
                  value={inputValues.confirmpassword}
                  name="confirmpassword"
                  onChange={(event) => handleOnChange(event)}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>

              <button
                onClick={() => handleSavePassword()}
                type="button"
                className="btn btn-primary ml-3"
              >
                Lưu thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyForgotPassword;
