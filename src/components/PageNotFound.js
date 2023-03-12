import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

function PageNotFound() {
  const [loggedIn, _] = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);

  return (
    <>
      {loggedIn && (
        <div style={{textAlign: "center"}}>
          <h1>404</h1>
          <hr />
          <h2>Whoops!</h2>
          <h4>
            Looks like you've stumbled across a deep dark corner of Bookity.
          </h4>
          <h5>Turn around now for your own good.</h5>
        </div>
      )}
    </>
  );
}

export default PageNotFound;
