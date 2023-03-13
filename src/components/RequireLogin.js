import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export const RequireLogin = ({ children }) => {
  const [loggedIn] = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Take me away!:', loggedIn);
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);

  return <>{loggedIn && children }</>;
};
