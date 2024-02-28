import "./VoucherItem.scss";

import CommonUtils from "../../utils/CommonUtils";
import React from "react";

function VoucherItem(props) {
  let handleSaveVoucher = () => {
    props.sendDataFromVoucherItem(props.id);
  };
  return (
    <div>
      <div
        style={{ width: props.width, height: props.height }}
        className="box-voucher"
      >
        <div className="content-left">
          <img alt="logoVoucher" src="/resources/img/logoVoucher.png"></img>
          <span>{props.name}</span>
        </div>
        <div className="border-center"></div>
        <div className="content-right">
          <div className="box-content-right">
            <span className="name-voucher">Giảm {props.typeVoucher}</span>
            <span className="max-value-voucher">
              Giảm tối đa {CommonUtils.formatter.format(props.maxValue)}
            </span>
            <div className="box-percent">
              <div className="wrap-percent">
                <div
                  style={{ width: `${props.widthPercent}%` }}
                  className="percent"
                ></div>
              </div>
              <span className="used-percent">Đã dùng {props.usedAmount}%</span>
            </div>
            <button onClick={() => handleSaveVoucher()} className="btn-voucher">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoucherItem;
