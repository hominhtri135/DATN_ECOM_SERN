import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useEffect, useState } from "react";

import React from "react";
import { getDetailAddressUserByIdService } from "../../services/userService";
import { toast } from "react-toastify";

const AddressUsersModal = (props) => {
  const [inputValues, setInputValues] = useState({
    shipName: "",
    shipAdress: "",
    shipEmail: "",
    shipPhonenumber: "",
    isActionUpdate: false,
  });
  useEffect(() => {
    let id = props.addressUserId;
    if (id) {
      let fetchDetailAddress = async () => {
        let res = await getDetailAddressUserByIdService(id);
        if (res && res.errCode === 0) {
          setInputValues({
            ...inputValues,
            ["isActionUpdate"]: true,
            ["shipName"]: res.data.shipName,
            ["shipAdress"]: res.data.shipAdress,
            ["shipEmail"]: res.data.shipEmail,
            ["shipPhonenumber"]: res.data.shipPhonenumber,
          });
        }
      };
      fetchDetailAddress();
    }
  }, [props.isOpenModal]);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    console.log(`[${name}] ${value}`);
    setInputValues({ ...inputValues, [name]: value });
  };
  let handleCloseModal = () => {
    props.closeModaAddressUser();
    setInputValues({
      ...inputValues,
      ["isActionUpdate"]: false,
      ["shipName"]: "",
      ["shipAdress"]: "",
      ["shipEmail"]: "",
      ["shipPhonenumber"]: "",
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    toast.success({ inputValues });
    if (
      !inputValues.shipName ||
      !inputValues.shipPhonenumber ||
      !inputValues.shipEmail ||
      !inputValues.shipAdress
    ) {
      return toast.error("Vui lòng nhập đầy đủ thông tin");
    }

    props.sendDataFromModalAddress({
      shipName: inputValues.shipName,
      shipAdress: inputValues.shipAdress,
      shipEmail: inputValues.shipEmail,
      shipPhonenumber: inputValues.shipPhonenumber,
      id: props.addressUserId,
      isActionUpdate: inputValues.isActionUpdate,
    });

    setInputValues({
      ...inputValues,
      ["shipName"]: "",
      ["shipAdress"]: "",
      ["shipEmail"]: "",
      ["shipPhonenumber"]: "",
      ["isActionUpdate"]: false,
    });
  };

  return (
    <div className="">
      <Modal
        isOpen={props.isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title">Địa chỉ mới</h5>
          <button
            onClick={handleCloseModal}
            type="button"
            className="btn btn-time"
            aria-label="Close"
          >
            X
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <form id="myform" onSubmit={handleSubmit}>
              <div className="col-6 form-group">
                <label>Họ và tên</label>
                <input
                  value={inputValues.shipName}
                  name="shipName"
                  onChange={(event) => handleOnChange(event)}
                  type="text"
                  className="form-control"
                  required={true}
                />
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input
                  value={inputValues.shipPhonenumber}
                  name="shipPhonenumber"
                  onChange={(event) => handleOnChange(event)}
                  type="text"
                  className="form-control"
                  pattern="(84|0[3,5,7,8,9])+([0-9]{8})"
                  title="Số điện thoại phải bắt đầu bằng 84 hoặc 0 và có 10 chữ số"
                  required={true}
                />
              </div>
              <div className="col-12 form-group">
                <label>Email</label>
                <input
                  value={inputValues.shipEmail}
                  name="shipEmail"
                  onChange={(event) => handleOnChange(event)}
                  type="email"
                  required={true}
                  className="form-control"
                />
              </div>
              <div className="col-12 form-group">
                <label>Địa chỉ cụ thể</label>
                <input
                  value={inputValues.shipAdress}
                  name="shipAdress"
                  onChange={(event) => handleOnChange(event)}
                  type="text"
                  className="form-control"
                  required={true}
                />
              </div>
            </form>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" type="submit" form="myform">
            Lưu thông tin
          </Button>{" "}
          <Button onClick={handleCloseModal}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default AddressUsersModal;
