import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    element: AdminPage,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    element: <HomePage />,
  },

  {
    path: REGISTRATION_ROUTE,
    element: <AuthPage />,
  },

  {
    path: LOGIN_ROUTE,
    element: <AuthPage />,
  },
];
