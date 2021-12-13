import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import WordLearnPage from "./pages/WordLearnPage";
import WordListPage from "./pages/WordListPage";

import {
  HOME_ROUTE,
  LEARN_WORD_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
  WORD_LIST_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: HOME_ROUTE,
    element: <UserPage />,
  },

  {
    path: USER_ROUTE,
    element: <UserPage />,
  },

  {
    path: WORD_LIST_ROUTE + "/:id",
    element: <WordListPage />,
  },

  {
    path: LEARN_WORD_ROUTE + "/:id",
    element: <WordLearnPage />,
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
