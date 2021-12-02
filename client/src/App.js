import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";

import { check } from "./http/userApi";
import { ToastProvider } from "react-toast-notifications";
import AppRouter from "./components/AppRouter";
import { lightTheme, darkTheme, GlobalStyles } from "./themes";
import AppHeader from "./components/appHeader/AppHeader";
import { setIsAuth, setUser } from "./store/userSlice";
import { Main } from "./components/Main";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        dispatch(setUser(data));
        dispatch(setIsAuth(true));
      })
      .finally(setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ToastProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />

        <Router>
          <AppHeader theme={theme} toggleTheme={toggleTheme} />
          <Main>
            <AppRouter />
          </Main>
        </Router>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default App;
