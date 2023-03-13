import React from "react";
import { RequireLogin } from "../components/RequireLogin";

function PageNotFound() {
  return (
    <RequireLogin>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>404</h1>
        <hr />
        <h2>Whoops!</h2>
        <h4>
          Looks like you've stumbled across a deep dark corner of Bookity.
        </h4>
        <h5>Turn around now for your own good.</h5>
      </div>
    </RequireLogin>
  );
}

export default PageNotFound;
