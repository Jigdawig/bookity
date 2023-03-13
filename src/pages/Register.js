import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { createUser } from "../utils/userApi";

function Register() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const formValid = () => {
    // Not doing any special input sanitization. Just checking if fields are all filled in
    return !!userName && !!firstName && !!lastName && !!password && !!dateOfBirth && !!color;
  }

  const signUp = (e) => {
    e.preventDefault();
    let err = createUser({
      firstName,
      lastName,
      userName,
      password,
      dateOfBirth,
      favoriteColor: color,
    });

    if (err) {
      console.log("error registering:", err);
      setError(err);

      return;
    }

    navigate("/login");
  };
  return (
    <div
      className="modal show auth-container"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Body>
      <div className="error-banner" hidden={!error}>{error}</div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="test"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicFavoriteColor">
            <Form.Label>Favorite Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Favorite Color"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="date_of_birth"
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" disabled={!formValid()} onClick={signUp}>
              Create Account
            </Button>
          </div>
          <hr />
          <Form.Text id="swapToSignIn">
            Already have have an account? <a href="/login"> Sign in here</a>
          </Form.Text>
        </Form>
      </Modal.Body>
    </div>
  );
}

export default Register;
