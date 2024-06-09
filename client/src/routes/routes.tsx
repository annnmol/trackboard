import { Navigate, createBrowserRouter } from "react-router-dom";
//user defined
import LoginPage from "@/screens/(auth)/login/page";
import RegisterPage from "@/screens/(auth)/register/page";
import HomeScreen from "@/screens/(protected)/home-screen";
import ErrorScreen from "@/screens/error-screen";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const appRouter = createBrowserRouter(
  [
    {
      element: <AuthRoutes />,
      errorElement: <ErrorScreen />,
      path: "auth",
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
    {
      element: <ProtectedRoutes />,
      errorElement: <ErrorScreen />,
      children: [
        {
          path: "/",
          element: <HomeScreen />,
          errorElement: <Navigate to="/error" />,
        },
      ],
    },
    {
      path: "error",
      element: <ErrorScreen />,
    },
    // Add this route at the end
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
  {
    basename: "/",
  }
);

export default appRouter;
