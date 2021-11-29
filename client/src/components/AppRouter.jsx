import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "../index";
import HomePage from "../pages/HomePage";
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
