import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import logo from "../images/bookity-logo.jpg";
import { LoginContext } from "../App";

function Header() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();

  const logout = () => {
    setLoggedIn(false);
    localStorage.clear();
    sessionStorage.clear();

	navigate('/');
  };

  return (
    <Navbar key="lg" bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} className="bookity-logo" alt="bookity logo" />
          Bookity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          {loggedIn && (
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown
                  title={sessionStorage?.id}
                  className="justify-content-end flex-grow-1 pe-3"
                  id="offcanvasNavbarDropdown-expand-lg"
                >
                  <NavDropdown.Item href="/">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Item href="/password-change">Change Password</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/login"
                    onClick={logout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          )}
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;