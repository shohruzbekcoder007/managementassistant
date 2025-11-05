import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Unauthorized } from "../pages/Unauthorized";
import { RoleManagement } from "../pages/RoleManagement";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute requiredPermission="canViewDashboard">
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <p>error</p>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredPermission="canViewDashboard">
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <p>error</p>,
  },
  {
    path: "/roles",
    element: (
      <ProtectedRoute requiredPermission="canManageRoles">
        <RoleManagement />
      </ProtectedRoute>
    ),
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
    path: "/unauthorized",
    element: <Unauthorized />,
    errorElement: <p>error</p>,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <p>error</p>,
  }
]);