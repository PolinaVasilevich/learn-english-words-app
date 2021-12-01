import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { HOME_ROUTE, LOGIN_ROUTE, USER_ROUTE } from "../../utils/consts";

import { IoMoon, IoSunny } from "react-icons/io5";

import { Header, ModeSwitcher, Wrapper, LinkButton } from "./AppHeaderStyled";
import { useSelector, useDispatch } from "react-redux";
import { setIsAuth, setUser } from "../../store/userSlice";

const AppHeader = ({ theme, toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);

  const logOut = () => {
    dispatch(setUser({}));
    dispatch(setIsAuth(false));
    localStorage.removeItem("token");
    navigate(HOME_ROUTE);
  };

  return (
    <Header>
      <Wrapper>
        <nav>
          {isAuth ? (
            <>
              <NavLink to={USER_ROUTE}>User page</NavLink>
              <LinkButton onClick={logOut}>Logout</LinkButton>
            </>
          ) : (
            <NavLink to={LOGIN_ROUTE}>Sign in</NavLink>
          )}
        </nav>
        <ModeSwitcher onClick={toggleTheme}>
          {theme === "light" ? <IoSunny /> : <IoMoon />}
          <span style={{ marginLeft: "0.4rem" }}>{theme} Theme</span>
        </ModeSwitcher>
      </Wrapper>
    </Header>
  );
};

export default AppHeader;
