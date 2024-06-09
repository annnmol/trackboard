import { Outlet} from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-0 gap-4">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
