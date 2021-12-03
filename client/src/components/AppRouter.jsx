import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { authRoutes, publicRoutes } from "../routes";
import NotFound from "./notfound/NotFound";

const AppRouter = () => {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
