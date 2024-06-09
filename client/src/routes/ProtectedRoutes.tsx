import { Navigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
//user defined
import ProtectedLayout from "@/screens/(protected)/layout";
import useAppStore from "@/store";


const ProtectedRoutes = () => {
  const authSession = useAppStore(useShallow((state) => state.authSession));
  
  return authSession ? <ProtectedLayout /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoutes;
