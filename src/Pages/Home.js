import React, { useContext } from "react";
import { LoginContext } from "./LoginContext";
import { Navigate } from "react-router-dom";

function Home() {
  const context = useContext(LoginContext);
  if (context.user === null) {
    return <Navigate to="/login" />;
  }
  return <div>Home</div>;
}

export default Home;
