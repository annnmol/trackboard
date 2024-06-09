import { Coins, LogOut } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

//user defined
import { Button } from "@/components/ui/button";
import useAppStore from "@/store";
import useAuthService from "@/hooks/useAuthService";

const Header = () => {
  const { setAuthSession, authSession } = useAppStore();

  // console.log(`🚀 ~ file: header.tsx:13 ~ Header ~ authSession:`, authSession);


  // const { getMyWallet } = useWalletService();
const {getUserByIdFn, logoutFn} = useAuthService();
  // useEffect(() => {
  //   getUserByIdFn(authSession?._id);
  //   // if (authSession) {
  //   //   getMyWallet(authSession);
  //   // }
  //   return () => {};
  // }, []);

  const handleLogout = () => {
    // setAuthSession(null);
    logoutFn();
  };
  return (
    <>
      <nav className="flex-col gap-6 text-lg font-medium items-center">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Coins className="h-6 w-6 text-primary-foreground" />
          <span className="text-primary-foreground">Trackboard</span>
        </Link>
      </nav>

      <div className="flex w-full items-center justify-end gap-6">
        <span className="text-primary-foreground">Hey {authSession?.fullName}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-[24px] w-[24px]"
          onClick={handleLogout}
          title="logout"
        >
          <LogOut className="h-4 w-4 text-muted" />
        </Button>
      </div>
    </>
  );
};

export default Header;
