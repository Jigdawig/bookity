import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { LoginContext } from "../App";
import { updateUser } from "../utils/userApi";

function PasswordChange() {
  const [password, setPassword] = useState('');
  const [loggedIn, _] = useContext(LoginContext);
  const navigate = useNavigate();

  const changePassword = () => {
   updateUser({
    userName: sessionStorage?.id,
    password
});
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  return (
    <>
      {loggedIn && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={changePassword} disabled={password === ''}>
            Save
          </Button>
        </Form>
      )}
    </>
  );
}

export default PasswordChange;
