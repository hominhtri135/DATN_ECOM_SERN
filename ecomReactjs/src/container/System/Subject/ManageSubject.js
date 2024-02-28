import {
  DeleteAllcodeService,
  getListAllCodeService,
} from "../../../services/userService";
import { useEffect, useState } from "react";

import CommonUtils from "../../../utils/CommonUtils";
import FormSearch from "../../../component/Search/FormSearch";
import { Link } from "react-router-dom";
import { PAGINATION } from "../../../utils/constant";
import React from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ManageSubject = () => {
  const [dataSubject, setdataSubject] = useState([]);
  const [count, setCount] = useState("");
  const [numberPage, setnumberPage] = useState("");
  const [keyword, setkeyword] = useState("");
  useEffect(() => {
    fetchData(keyword);
  }, []);
  let fetchData = async (keyword) => {
    let arrData = await getListAllCodeService({
      type: "SUBJECT",
      limit: PAGINATION.pagerow,
      offset: 0,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataSubject(arrData.data);
      setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
    }
  };
  let handleDeleteSubject = async (event, id) => {
    event.preventDefault();
    let res = await DeleteAllcodeService(id);
    if (res && res.errCode === 0) {
      toast.success("Xóa chủ đề thành công");
      let arrData = await getListAllCodeService({
        type: "SUBJECT",
        limit: PAGINATION.pagerow,
        offset: numberPage * PAGINATION.pagerow,
        keyword: keyword,
      });
      if (arrData && arrData.errCode === 0) {
        setdataSubject(arrData.data);
        setCount(Math.ceil(arrData.count / PAGINATION.pagerow));
      }
    } else toast.error("Xóa chủ đề thất bại");
  };
  let handleChangePage = async (number) => {
    setnumberPage(number.selected);
    let arrData = await getListAllCodeService({
      type: "SUBJECT",
      limit: PAGINATION.pagerow,
      offset: number.selected * PAGINATION.pagerow,
      keyword: keyword,
    });
    if (arrData && arrData.errCode === 0) {
      setdataSubject(arrData.data);
    }
  };
  let handleOnchangeSearch = (keyword) => {
    fetchData(keyword);
    setkeyword(keyword);
  };
  let handleOnClickExport = async () => {
    let res = await getListAllCodeService({
      type: "SUBJECT",
      limit: "",
      offset: "",
      keyword: "",
    });
    if (res && res.errCode == 0) {
      await CommonUtils.exportExcel(
        res.data,
        "Danh sách chủ đề",
        "ListSubject"
      );
    }
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý chủ đề</h1>

      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-table me-1" />
          Danh sách chủ đề sản phẩm
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <FormSearch
                title={"tên chủ đề"}
                handleOnchange={handleOnchangeSearch}
                keyword={keyword}
              />
            </div>
            <div className="col-8">
              <button
                style={{ float: "right" }}
                onClick={() => handleOnClickExport()}
                className="btn btn-success"
              >
                Xuất excel <i class="fa-solid fa-file-excel"></i>
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table
              className="table table-bordered"
              style={{ border: "1" }}
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>mã code</th>
                  <th>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {dataSubject &&
                  dataSubject.length > 0 &&
                  dataSubject.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.value}</td>
                        <td>{item.code}</td>
                        <td>
                          <Link to={`/admin/edit-subject/${item.id}`}>
                            Edit
                          </Link>
                          &nbsp; &nbsp;
                          <a
                            href="#"
                            onClick={(event) =>
                              handleDeleteSubject(event, item.id)
                            }
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Quay lại"}
        nextLabel={"Tiếp"}
        breakLabel={"..."}
        pageCount={count}
        marginPagesDisplayed={3}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        breakClassName={"page-item"}
        activeClassName={"active"}
        onPageChange={handleChangePage}
      />
    </div>
  );
};
export default ManageSubject;
