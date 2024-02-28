import React, { useEffect, useRef, useState } from "react";

import { loadMessage } from "../../services/userService";
import moment from "moment";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";

require("dotenv").config();
const host = process.env.REACT_APP_BACKEND_URL;
function ChatWindow(props) {
  const [mess, setMess] = useState([]);
  const [userData, setuserData] = useState({});
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);

    if (props.roomId) {
      fetchMessage();
    }

    socketRef.current.on("sendDataServer", (dataGot) => {
      fetchMessage();
      // let elem = document.getElementById("box-chat");
      // if (elem) elem.scrollTop = elem.scrollHeight;
    }); // mỗi khi có tin nhắn thì mess sẽ được render thêm

    return () => {
      socketRef.current.disconnect();
    };
  }, [props.roomId]);
  let fetchMessage = async () => {
    let res = await loadMessage(props.roomId, props.userId);
    if (res) {
      setMess(res.data);
      setuserData(res.data.userData);
    }
  };
  let sendMessage = () => {
    if (message !== null) {
      const msg = {
        text: message,
        userId: user.id,
        roomId: props.roomId,
        userData: userData,
      };
      socketRef.current.emit("sendDataClient", msg);
      setMessage("");
    }
  };
  return (
    <div className="ks-messages ks-messenger__messages">
      <div className="ks-header">
        <div className="ks-description">
          <div className="ks-name">Chat name</div>
          <div className="ks-amount">2 members</div>
        </div>
      </div>
      <div
        className="ks-body ks-scrollable jspScrollable"
        data-auto-height
        data-reduce-height=".ks-footer"
        data-fix-height={32}
        style={{
          height: "480px",
          overflow: "hidden",
          padding: "0px",
          width: "701px",
        }}
        tabIndex={0}
      >
        <div
          className="jspContainer"
          style={{ width: "701px", height: "481px" }}
        >
          <div
            className="jspPane"
            style={{ padding: "0px", top: "0px", width: "691px" }}
          >
            <ul
              id="box-chat"
              className="ks-items"
              style={{ overflowY: "scroll", maxHeight: "479px" }}
            >
              {mess &&
                mess.length > 0 &&
                mess.map((item, index) => {
                  if (item.userData) {
                    return (
                      <li
                        key={index}
                        className={
                          item.userData.id === user.id
                            ? "ks-item ks-from"
                            : "ks-item ks-self"
                        }
                      >
                        <span className="ks-avatar ks-offline">
                          <img
                            alt=""
                            src={item.userData.image}
                            width={36}
                            height={36}
                            className="rounded-circle"
                          />
                        </span>
                        <div className="ks-body">
                          <div className="ks-header">
                            <span className="ks-name">{`${
                              item.userData.firstName
                                ? item.userData.firstName
                                : ""
                            } ${item.userData.lastName}`}</span>
                            <span className="ks-datetime">
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <div className="ks-message">{item.text}</div>
                        </div>
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
          <div className="jspVerticalBar">
            <div className="jspCap jspCapTop" />
            <div className="jspTrack" style={{ height: "481px" }}>
              <div className="jspDrag" style={{ height: "206px" }}>
                <div className="jspDragTop" />
                <div className="jspDragBottom" />
              </div>
            </div>
            <div className="jspCap jspCapBottom" />
          </div>
        </div>
      </div>
      <div className="ks-footer">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="form-control"
          placeholder="Type something..."
          defaultValue={""}
        />
        <div className="ks-controls">
          <button onClick={() => sendMessage()} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
