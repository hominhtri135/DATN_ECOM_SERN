import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { debounce } from "lodash";

const FormSearch = (props) => {
  const { handleOnchange, keyword } = props;
  return (
    <form>
      <div className="form-group">
        <div className="input-group mb-3">
          <input
            onChange={debounce((e) => handleOnchange(e.target.value), 500)}
            // value={keyword}
            defaultValue={keyword}
            type="text"
            className="form-control"
            placeholder={`Tìm kiếm theo ${props.title}`}
          />
          <div className="input-group-append">
            <button
              //   onClick={() => handleSearchProduct()}
              className="btn"
              type="button"
            >
              <i className="ti-search" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default FormSearch;
