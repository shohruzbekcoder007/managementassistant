import { createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <p>error</p>,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <p>error</p>,
  }
]);