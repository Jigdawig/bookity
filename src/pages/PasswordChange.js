import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updateUser } from "../utils/userApi";
import { RequireLogin } from "../components/RequireLogin";

function PasswordChange() {
  const [password, setPassword] = useState("");

  const changePassword = () => {
    updateUser({
      userName: localStorage?.id,
      password,
    });
  };

  return (
    <RequireLogin>
      <Form className="form-container">
        <Form.Group className="mb-3">
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={changePassword}
          disabled={password === ""}
        >
          Save
        </Button>
      </Form>
    </RequireLogin>
  );
}

export default PasswordChange;
