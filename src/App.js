import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PasswordChange from "./pages/PasswordChange";
import PageNotFound from "./pages/PageNotFound";

export const LoginContext = createContext();
export const ThemeContext = createContext();
export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.access === "true"
  );
  const [themeContext, setThemeContext] = useState(
    localStorage.themePreference || "light"
  );
  const [userContext, setUserContext] = useState(
    `${localStorage?.firstName} ${localStorage?.lastName}`
  );

  const navigate = useNavigate();

  const changeLoggedIn = (value) => {
    setLoggedIn(value);

    if (value === false) {
      localStorage.clear();
      sessionStorage.clear();

      navigate("/");
    }
  };

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <ThemeContext.Provider value={[themeContext, setThemeContext]}>
      	<UserContext.Provider value={[userContext, setUserContext]}>
			<div className={`${themeContext}-mode main-container`}>
			<Header />
			<div className="bookity-app">
				<Routes>
				<Route path="" Component={Dashboard} />
				<Route path="/" Component={Dashboard} />
				<Route path="/login" Component={Login} />
				<Route path="/register" Component={Register} />
				<Route path="/settings" Component={Settings} />
				<Route path="/password-change" Component={PasswordChange} />
				<Route path="*" Component={PageNotFound} />
				</Routes>
			</div>
			</div>
      	</UserContext.Provider>
      </ThemeContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
