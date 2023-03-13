import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { authenticateUser } from "../utils/userApi";
import { LoginContext, ThemeContext } from "../App";

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [themeContext, setThemeContext] = useContext(ThemeContext);

  const location = useLocation();
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    let response = authenticateUser(userName, password);

    if (response.error) {
      console.log('error logging in:', response.error)
      setError(response.error);

      return;
    }
    
    sessionStorage.setItem("access", true);
    sessionStorage.setItem("refresh", false);
  
    setLoggedIn(true);

    sessionStorage.setItem("id", response.cacheData.userName);
    sessionStorage.setItem("firstName", response.cacheData.firstName);
    sessionStorage.setItem("lastName", response.cacheData.lastName);
    sessionStorage.setItem("dateOfBirth", response.cacheData.dateOfBirth);
    sessionStorage.setItem("themePreference", response.cacheData.themePreference);
    sessionStorage.setItem("favoriteColor", response.cacheData.favoriteColor);

    setThemeContext(response.cacheData.themePreference);

    navigate(location?.state?.previousUrl ? location.state.previousUrl : "/");
  };

  return (
    <div
      className="modal show auth-container"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={userName}
              required
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" onClick={signIn}>
              Submit
            </Button>
          </div>
          <hr />

          <Form.Text id="swapToRegister">
            Don't have an account? <a href="/register"> Create one here</a>
          </Form.Text>
        </Form>
        <div className="login-error-banner" hidden={!error}></div>
      </Modal.Body>
    </div>
  );
}

export default Login;
