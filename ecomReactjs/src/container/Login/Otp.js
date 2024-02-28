import "./Otp.scss";

import React, { useEffect, useRef, useState } from "react";
import { createNewUser, handleLoginService } from "../../services/userService";

import firebase from "../../utils/firebase";
import { toast } from "react-toastify";

const Otp = (props) => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [timeCountdown, setTimeCountdown] = useState(0);
  const otpFieldsRef = useRef([]);

  useEffect(() => {
    if (timeCountdown > 0) {
      setTimeout(() => {
        setTimeCountdown((prev) => prev - 1);
      }, 1000);
    }
  }, [timeCountdown]);

  useEffect(() => {
    if (props.dataUser) {
      let fetchOtp = async () => {
        await onSignInSubmit(false);
      };
      fetchOtp();
    }
  }, [props.dataUser]);

  let configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        defaultCountry: "VN",
      }
    );
  };

  let onSignInSubmit = async (isResend) => {
    if (!isResend) configureCaptcha();
    let phoneNumber = props.dataUser.phonenumber;
    if (phoneNumber) {
      phoneNumber = "+84" + phoneNumber.slice(1);
    }

    console.log("check phonenumber", phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast.success("Đã gửi mã OTP vào điện thoại");

        // ...
      })
      .catch((error) => {
        console.log(error);
        toast.error("Gửi mã thất bại !");
      });
  };

  let submitOTP = async () => {
    const code = otpValues.join("");
    await window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        toast.success("Đã xác minh số điện thoại !");
        let createUser = async () => {
          let res = await createNewUser({
            email: props.dataUser.email,
            lastName: props.dataUser.lastName,
            phonenumber: props.dataUser.phonenumber,
            password: props.dataUser.password,
            roleId: props.dataUser.roleId,
          });
          if (res && res.errCode === 0) {
            toast.success("Tạo tài khoản thành công");
            handleLogin(props.dataUser.email, props.dataUser.password);
          } else {
            toast.error(res.errMessage);
          }
        };
        createUser();

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        toast.error("Mã OTP không đúng !");
      });
  };
  let handleLogin = async (email, password) => {
    let res = await handleLoginService({
      email: email,
      password: password,
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
  let resendOTP = async () => {
    setTimeCountdown(60);
    await onSignInSubmit(true);
  };

  const handleInput = (index, value) => {
    if (value.length > 1) {
      return;
    }
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value.length === 1 && index < otpValues.length - 1) {
      otpFieldsRef.current[index + 1].focus();
    }
    const optVal = newOtpValues.join("");
    console.log("handleInput:::", { optVal });
  };

  const handleBackspace = (index) => {
    if (otpValues[index] !== "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
    } else if (index > 0) {
      otpFieldsRef.current[index - 1].focus();
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center container_Otp my-5">
      <div className="card text-center">
        <div className="card-header p-5">
          <img
            alt=""
            src="https://raw.githubusercontent.com/Rustcodeweb/OTP-Verification-Card-Design/main/mobile.png"
          />
          <h5 style={{ color: "#fff" }} className="mb-2">
            XÁC THỰC OTP
          </h5>
          <div>
            <small>
              Mã đã được gửi tới sdt{" "}
              {props.dataUser && props.dataUser.phonenumber}
            </small>
          </div>
        </div>
        <div className="input-container d-flex flex-row justify-content-center mt-2">
          {otpValues.map((value, index) => (
            <input
              name="otp"
              type="text"
              autoComplete="off"
              className="m-1 text-center form-control rounded"
              value={value}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
              ref={(ref) => {
                otpFieldsRef.current[index] = ref;
              }}
              tabIndex="1"
              maxLength="1"
              key={index}
              autofocus
            />
          ))}
        </div>

        <small className="d-flex">
          Bạn không nhận được Otp ?
          {timeCountdown > 0 ? (
            <div className="text-decoration-none ml-2">
              Gửi lại sau: {timeCountdown} giây
            </div>
          ) : (
            <div
              onClick={() => resendOTP()}
              style={{ color: "#3366FF", cursor: "pointer" }}
              className="text-decoration-none ml-2"
            >
              Gửi lại
            </div>
          )}
        </small>
        <div className="mt-3 mb-5">
          <div id="sign-in-button"></div>
          <button
            onClick={() => submitOTP()}
            className="btn btn-success px-4 verify-btn"
          >
            Xác thực
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
