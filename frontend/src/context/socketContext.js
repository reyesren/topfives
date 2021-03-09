import React from "react";

const socketContext = React.createContext({
  socket: null,
  users: null,
});

export default socketContext;
