import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import WordListPage from "./pages/WordListPage";

import {
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
  WORD_LIST_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <AdminPage />,
  },

  {
    path: USER_ROUTE,
    element: <UserPage />,
  },

  {
    path: WORD_LIST_ROUTE + "/:id",
    element: <WordListPage />,
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
