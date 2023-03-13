import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { LoginContext, ThemeContext } from "../App";
import { updateUser } from "../utils/userApi";

function Settings() {
  const [loggedIn] = useContext(LoginContext);
  const [themeContext, setThemeContext] = useContext(ThemeContext);

  const [firstName, setFirstName] = useState(sessionStorage?.firstName);
  const [lastName, setLastName] = useState(sessionStorage?.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(sessionStorage?.dateOfBirth);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [favoriteColor, setFavoriteColor] = useState(
    sessionStorage?.favoriteColor
  );
  const [themePreference, setThemePreference] = useState(
    sessionStorage?.themePreference
  );

  const navigate = useNavigate();

  const discardChanges = () => {
    setFirstName(sessionStorage?.firstName);
    setLastName(sessionStorage?.lastName);
    setDateOfBirth(sessionStorage?.dateOfBirth);
    setFavoriteColor(sessionStorage?.favoriteColor);
    setThemePreference(sessionStorage?.themePreference);

    setPendingChanges(false);
  };

  const update = () => {
    if (!pendingChanges) {
      return;
    }


    const response = updateUser({
      userName: sessionStorage.id,
      firstName,
      lastName,
      dateOfBirth,
      favoriteColor,
      themePreference,
    });

     // Update session data
     sessionStorage.setItem("firstName", response.cacheData.firstName);
     sessionStorage.setItem("lastName", response.cacheData.lastName);
     sessionStorage.setItem("dateOfBirth", response.cacheData.dateOfBirth);
     sessionStorage.setItem("favoriteColor", response.cacheData.favoriteColor);
     sessionStorage.setItem(
       "themePreference",
       response.cacheData.themePreference
     );

    setPendingChanges(false);
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
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => {
                setPendingChanges(true);
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => {
                setPendingChanges(true);
                setLastName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFavoriteColor">
            <Form.Label>Favorite Color</Form.Label>
            <Form.Control
              type="text"
              value={favoriteColor}
              onChange={(e) => {
                setPendingChanges(true);
                setFavoriteColor(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="date_of_birth"
              value={dateOfBirth}
              onChange={(e) => {
                setPendingChanges(true);
                setDateOfBirth(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Switch
            id="custom-form-switch"
            label={themePreference === "dark" ? "Dark Mode" : "Light Mode"}
            checked={themePreference === "dark"}
            onChange={(e) => {
              setPendingChanges(true);
              setThemePreference(e.target.checked ? "dark" : "light");
              setThemeContext(e.target.checked ? "dark" : "light");
            }}
          />
          <Button variant="primary" type="submit" onClick={update} disabled={!pendingChanges}>
            Save Changes
          </Button> {' '}
          <Button variant="secondary" type="cancel" onClick={discardChanges} disabled={!pendingChanges}>
            Discard Changes
          </Button>
        </Form>
      )}
    </>
  );
}

export default Settings;
