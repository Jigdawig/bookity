import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Settings from "./components/Settings";
import PasswordChange from "./components/PasswordChange";
import PageNotFound from "./components/PageNotFound";

export const LoginContext = createContext();

function App() {
  useEffect(() => {
    const refreshTokens = () => {
      if (localStorage.refresh) {
        // refresh the token if the user has done something
        localStorage.access = true;
        localStorage.refresh = false;
        setLoggedIn(true);
      }
    }

    const minute = 1000 * 10; // 10 minute session
    refreshTokens();
    setInterval(refreshTokens, minute);
  }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  const changeLoggedIn = (value) =>{
    setLoggedIn(value);

    if (value === false) {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <Header />
      <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/settings" Component={Settings} />
          <Route path="/password-change" Component={PasswordChange} />
          <Route path="*" Component={PageNotFound} />
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
