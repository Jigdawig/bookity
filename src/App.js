import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PasswordChange from "./pages/PasswordChange";
import PageNotFound from "./pages/PageNotFound";

export const LoginContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.access ? true : false);
  const [themeContext, setThemeContext] = useState(sessionStorage.themePreference || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    const refreshTokens = () => {
      if (sessionStorage.refresh) {
        // refresh the token if the user has done something
        sessionStorage.access = true;
        sessionStorage.refresh = false;
        setLoggedIn(true);
      }
    }

    const minute = 1000 * 10; // 10 minute session
    refreshTokens();
    setInterval(refreshTokens, minute);
  }, []);

  const changeLoggedIn = (value) =>{
    setLoggedIn(value);

    if (value === false) {
      // localStorage.clear();
      sessionStorage.clear();

      navigate('/');
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
    <ThemeContext.Provider value={[themeContext, setThemeContext]}>
      <Container className={`${themeContext}-mode main-container`}>
      <Header />
      <Container className="bookity-app">
        <Routes>
            <Route path="/" Component={Dashboard}/>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/settings" Component={Settings} />
            <Route path="/password-change" Component={PasswordChange} />
            <Route path="*" Component={PageNotFound} />
        </Routes>
      </Container>
      </Container>
    </ThemeContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
