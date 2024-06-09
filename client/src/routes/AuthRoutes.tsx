import { Navigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
//user defined
import AuthLayout from "@/screens/(auth)/layout";
import useAppStore from "@/store";

const AuthRoutes = () => {
  const authSession = useAppStore(useShallow((state) => state.authSession));

  return authSession ? <Navigate to="/" replace /> : <AuthLayout />;
};

export default AuthRoutes;
