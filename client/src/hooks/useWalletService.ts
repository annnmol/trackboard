import { toast } from "sonner";
//user defined components
import { handleError } from "@/lib/utils";
import { NetworkService } from "@/services/network";
import useAppStore from "@/store";

const useWalletService = () => {
  const {
    setLoading,
    loading,
    setCurrentWallet,
    currentWallet,
    setAuthSession,
  } = useAppStore();

  const setupWallet = async (
    name: string,
    balance: number = 0
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      NetworkService.post(`/wallet/setup`, { name, balance })
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            setAuthSession(res?.data?._id);
            setCurrentWallet(res?.data);
            resolve(res);
            toast(res?.message ?? "New Wallet Created", {
              description: `Wallet ${res?.data?.name} has been added successfully`,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          handleError(error);
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const getMyWallet = async (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      NetworkService.get(`/wallet/${id}`)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            setCurrentWallet(res?.data);
            resolve(res);
          }
        })
        .catch((error) => {
          handleError(error);
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return { setupWallet, currentWallet, setCurrentWallet, loading, getMyWallet };
};
export default useWalletService;
