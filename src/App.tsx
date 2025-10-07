import { RouterProvider } from "react-router-dom";
import "./assets/styles/main.scss";
import { router } from "./router/router";

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
