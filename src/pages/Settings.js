import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ThemeContext, UserContext } from "../App";
import { updateUser } from "../utils/userApi";
import { RequireLogin } from "../components/RequireLogin";

function Settings() {
  const [themeContext, setThemeContext] = useContext(ThemeContext);
  const [userContext, setUserContext] = useContext(UserContext);

  const [firstName, setFirstName] = useState(localStorage?.firstName);
  const [lastName, setLastName] = useState(localStorage?.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(localStorage?.dateOfBirth);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [favoriteColor, setFavoriteColor] = useState(
    localStorage?.favoriteColor
  );
  const [themePreference, setThemePreference] = useState(
    localStorage?.themePreference
  );

  const discardChanges = () => {
    setFirstName(localStorage?.firstName);
    setLastName(localStorage?.lastName);
    setDateOfBirth(localStorage?.dateOfBirth);
    setFavoriteColor(localStorage?.favoriteColor);
    setThemePreference(localStorage?.themePreference);

    setPendingChanges(false);
  };

  const update = () => {
    if (!pendingChanges) {
      return;
    }

    const response = updateUser({
      userName: localStorage.id,
      firstName,
      lastName,
      dateOfBirth,
      favoriteColor,
      themePreference,
    });

    // Update session data
    localStorage.setItem("firstName", response.cacheData.firstName);
    localStorage.setItem("lastName", response.cacheData.lastName);
    localStorage.setItem("dateOfBirth", response.cacheData.dateOfBirth);
    localStorage.setItem("favoriteColor", response.cacheData.favoriteColor);
    localStorage.setItem(
      "themePreference",
      response.cacheData.themePreference
    );

    setPendingChanges(false);
    setUserContext(`${localStorage?.firstName} ${localStorage?.lastName}`)
  };

  return (
    <RequireLogin>
      <Form className="form-container">
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
        <Button
          variant="primary"
          type="submit"
          onClick={update}
          disabled={!pendingChanges}
        >
          Save Changes
        </Button>{" "}
        <Button
          variant="secondary"
          type="cancel"
          onClick={discardChanges}
          disabled={!pendingChanges}
        >
          Discard Changes
        </Button>
      </Form>
    </RequireLogin>
  );
}

export default Settings;
