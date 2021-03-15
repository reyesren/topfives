import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import SocketContext from "../context/socketContext";

import { resetNotifications } from "../store/actions/messages";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const messageData = useSelector((state) => {
    return state.messages;
  });

  const { newNotifications } = messageData;

  useEffect(() => {
    console.log(newNotifications);
    if (newNotifications === true) {
      socket.socket.emit("seen_all_messages");
    }
  }, [newNotifications]);
  return <div></div>;
};

export default NotificationsPage;
