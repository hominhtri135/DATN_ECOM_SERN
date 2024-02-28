import "./LoginWebPage.scss";

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  checkPhonenumberEmail,
  createNewUser,
  handleLoginService,
  handleSendVerifyForgotPassword,
} from "../../services/userService";
import { useEffect, useState } from "react";

import Otp from "./Otp";
import React from "react";
import { async } from "@firebase/util";
import { authentication } from "../../utils/firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const LoginWebPage = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "passwordsecrect",
    confirmpassword: "",
    lastName: "",
    phonenumber: "",
    isOpen: false,
    dataUser: {},
  });
  const [timeCountdown, setTimeCountdown] = useState(0);
  useEffect(() => {
    if (timeCountdown > 0) {
      setTimeout(() => {
        setTimeCountdown((prev) => prev - 1);
      }, 1000);
    }
  }, [timeCountdown]);
  let history = useHistory();
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  let handleLogin = async () => {
    const element = document.querySelector("form");
    element.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    if (!inputValues.email || !inputValues.password) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!");
    }

    let res = await handleLoginService({
      email: inputValues.email,
      password: inputValues.password,
    });

    if (res && res.errCode === 0) {
      localStorage.setItem("userData", JSON.stringify(res.user));
      localStorage.setItem("token", JSON.stringify(res.accessToken));
      if (res.user.roleId === "R1" || res.user.roleId === "R3") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } else {
      toast.error(res.errMessage);
    }
  };
  let handleLoginSocial = async (email) => {
    const element = document.querySelector("form");
    element.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    let res = await handleLoginService({
      email: email,
      password: inputValues.password,
    });

    if (res && res.errCode === 0) {
      localStorage.setItem("userData", JSON.stringify(res.user));
      localStorage.setItem("token", JSON.stringify(res.accessToken));
      if (res.user.roleId === "R1" || res.user.roleId === "R3") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } else {
      toast.error(res.errMessage);
    }
  };

  let handleSaveUser = async () => {
    const element = document.querySelector("form");
    element.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    if (
      !inputValues.email ||
      !inputValues.password ||
      !inputValues.confirmpassword ||
      !inputValues.lastName ||
      !inputValues.phonenumber
    ) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!");
    }
    if (inputValues.password !== inputValues.confirmpassword) {
      return toast.error("Mật khẩu nhập lại không trùng khớp !");
    }
    let res = await checkPhonenumberEmail({
      phonenumber: inputValues.phonenumber,
      email: inputValues.email,
    });
    if (res.isCheck === true) {
      toast.error(res.errMessage);
    } else {
      setInputValues({
        ...inputValues,
        ["dataUser"]: {
          email: inputValues.email,
          lastName: inputValues.lastName,
          phonenumber: inputValues.phonenumber,
          password: inputValues.password,
          roleId: "R2",
        },
        ["isOpen"]: true,
      });
    }
  };
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };
  let signInwithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        LoginWithSocial(re);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  let LoginWithSocial = async (re) => {
    let res = await checkPhonenumberEmail({
      phonenumber: re.user.providerData[0].phoneNumber,
      email: re.user.providerData[0].email,
    });

    if (res.isCheck === true) {
      setInputValues({
        ...inputValues,
        ["email"]: re.user.providerData[0].email,
      });
      handleLoginSocial(re.user.providerData[0].email);
    } else {
      getBase64FromUrl(re.user.providerData[0].photoURL).then(async (value) => {
        let res = await createNewUser({
          email: re.user.providerData[0].email,
          lastName: re.user.providerData[0].displayName,
          phonenumber: re.user.providerData[0].phoneNumber,
          avatar: value,
          roleId: "R2",
          password: inputValues.password,
        });
        if (res && res.errCode === 0) {
          toast.success("Tạo tài khoản thành công");
          handleLoginSocial(re.user.providerData[0].email);
        } else {
          toast.error(res.errMessage);
        }
      });
    }
  };
  let signInwithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then(async (re) => {
        LoginWithSocial(re);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleForgotPassword = async () => {
    if (timeCountdown) {
      return toast.error(`Thực hiện lại sau: ${timeCountdown} giây`);
    }
    setTimeCountdown(60);

    if (!inputValues.email) {
      return toast.error("Vui lòng nhập email để lấy lại mật khẩu!");
    }

    let res = await handleSendVerifyForgotPassword({
      email: inputValues.email,
    });

    if (res && res.errCode === 0) {
      toast.success("Yêu cầu cấp lại mật khẩu đã gửi đến email của bạn!");
    } else {
      toast.error(res.errMessage);
    }
  };

  return (
    <>
      {inputValues.isOpen === false && (
        <div className="box-login">
          <div className="login-container">
            <section id="formHolder">
              <div className="row">
                {/* Brand Box */}
                <div className="col-sm-6 brand">
                  <div className="heading">
                    <h2>LIALILI</h2>
                    <p>Sự lựa chọn của bạn</p>
                  </div>
                </div>
                {/* Form Box */}
                <div className="col-sm-6 form">
                  {/* Login Form */}
                  <div className="login form-peice ">
                    <form className="login-form">
                      <div className="form-group">
                        <label htmlFor="loginemail">Địa chỉ email</label>
                        <input
                          name="email"
                          onChange={(event) => handleOnChange(event)}
                          type="email"
                          id="loginemail"
                          required={true}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="loginPassword">Mật khẩu</label>
                        <input
                          name="password"
                          onChange={(event) => handleOnChange(event)}
                          type="password"
                          id="loginPassword"
                          required={true}
                        />
                      </div>
                      <div className="CTA">
                        <input
                          onClick={() => handleLogin()}
                          type="submit"
                          value="Đăng nhập"
                        />
                        <a
                          style={{ cursor: "pointer" }}
                          className="switch pr-3"
                        >
                          Tài khoản mới
                        </a>
                        <a
                          style={{ cursor: "pointer" }}
                          className="forgot-password"
                          onClick={handleForgotPassword}
                        >
                          Quên mật khẩu
                        </a>
                      </div>
                      {/* <FacebookLoginButton
                        text="Đăng nhập với Facebook"
                        iconSize="25px"
                        style={{
                          width: "300px",
                          height: "40px",
                          fontSize: "16px",
                          marginTop: "40px",
                          marginBottom: "10px",
                        }}
                        onClick={() => signInwithFacebook()}
                      /> */}
                      <GoogleLoginButton
                        text="Đăng nhập với Google"
                        iconSize="25px"
                        style={{
                          width: "300px",
                          height: "40px",
                          marginTop: "40px",
                          fontSize: "16px",
                        }}
                        onClick={() => signInwithGoogle()}
                      />
                    </form>
                  </div>
                  {/* End Login Form */}
                  {/* Signup Form */}
                  <div className="signup form-peice switched">
                    <form className="signup-form">
                      <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                          type="text"
                          name="lastName"
                          onChange={(event) => handleOnChange(event)}
                          id="name"
                          className="name"
                          required={true}
                        />
                        <span className="error" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Địa chỉ email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={(event) => handleOnChange(event)}
                          id="email"
                          className="email"
                          required={true}
                        />
                        <span className="error" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phonenumber">Số điện thoại</label>
                        <input
                          type="tel"
                          id="phonenumber"
                          name="phonenumber"
                          pattern="(84|0[3,5,7,8,9])+([0-9]{8})"
                          title="Số điện thoại phải bắt đầu bằng 84 hoặc 0 và có 10 chữ số"
                          onChange={(event) => handleOnChange(event)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                          type="password"
                          name="password"
                          onChange={(event) => handleOnChange(event)}
                          id="password"
                          className="pass"
                          required={true}
                        />
                        <span className="error" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="passwordCon">Xác nhận mật khẩu</label>
                        <input
                          type="password"
                          name="confirmpassword"
                          onChange={(event) => handleOnChange(event)}
                          id="confirmpassword"
                          className="passConfirm"
                          required={true}
                        />
                        <span className="error" />
                      </div>
                      <div className="CTA">
                        <input
                          onClick={() => handleSaveUser()}
                          type="submit"
                          value="Lưu"
                          id="submit"
                        />
                        <a style={{ cursor: "pointer" }} className="switch">
                          Tôi có tài khoản
                        </a>
                      </div>
                    </form>
                  </div>
                  {/* End Signup Form */}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {inputValues.isOpen === true && <Otp dataUser={inputValues.dataUser} />}
    </>
  );
};
export default LoginWebPage;
