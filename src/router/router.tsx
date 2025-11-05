import { createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <p>error</p>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <p>error</p>,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <p>error</p>,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <p>error</p>,
  }
]);