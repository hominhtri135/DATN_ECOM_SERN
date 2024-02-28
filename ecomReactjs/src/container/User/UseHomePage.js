import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import AddressUser from "./AddressUser";
import CategoryUser from "./CategoryUser";
import ChangePassword from "../System/User/ChangePassword";
import DetailUserPage from "./DetailUserPage";
import MessagePage from "../Message/MessagePage";
import OrderUser from "./OrderUser";
import StoreVoucher from "./StoreVoucher";

function UserHomePage(props) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/user/messenger">
          <MessagePage />
        </Route>
        <div
          style={{ display: "flex" }}
          className="container rounded bg-white mt-5 mb-5"
        >
          <Route exact path="/user/detail/:id">
            <DetailUserPage />
          </Route>
          <Route exact path="/user/store-voucher/:id">
            <StoreVoucher id={user.id} />
          </Route>
          <Route exact path="/user/address/:id">
            <AddressUser id={user.id} />
          </Route>
          <Route exact path="/user/order/:id">
            <OrderUser id={user.id} />
          </Route>
          <Route exact path="/user/changepassword/:id">
            <ChangePassword id={user.id} />
          </Route>
          <CategoryUser id={user.id} />
        </div>
      </Switch>
    </Router>
  );
}

export default UserHomePage;
