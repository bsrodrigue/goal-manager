import { createBrowserRouter } from "react-router-dom";
import Root from "../ui/pages/Root";
import ErrorPage from "../ui/pages/Error";
import Main from "../ui/pages/Main";
import AuthPage from "../ui/pages/Auth";
import RequestsPage from "../ui/pages/Requests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/auth",
        element: <AuthPage />
      },
      {
        path: "/requests",
        element: < RequestsPage />
      },
    ]
  }
]);
