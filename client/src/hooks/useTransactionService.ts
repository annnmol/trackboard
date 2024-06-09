import { toast } from "sonner";
//user defined components
import { handleError } from "@/lib/utils";
import { NetworkService } from "@/services/network";
import useAppStore from "@/store";

interface IFetchTransactionsProps {
  id: string;
  skip?: number;
  limit?: number;
  amount?: number;
  date?: number;
}

const useTransactionService = () => {
  const { setLoading, loading, transactions, setTransactions } = useAppStore();

  const createTranscation = async (
    walletId: string,
    amount: number,
    description: string
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      NetworkService.post(`/transact/${walletId}`, { amount, description })
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("Transcation created", {
              description: `Wallet balance has been updated.`,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
              duration: 3000,
            });
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

  const getTranscations = async ({
    id,
    amount,
    limit,
    skip,
    date,
  }: IFetchTransactionsProps): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      let url = `/transactions?walletId=${id}`;
      if (typeof skip === "number") {
        url += `&skip=${skip}`;
      }
      if (typeof limit === "number") {
        url += `&limit=${limit}`;
      }
      if (amount === -1 || amount === 1) {
        url += `&amount=${amount}`;
      }
      if (date === -1 || date === 1) {
        url += `&date=${date}`;
      }

      NetworkService.get(url)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            setTransactions(res?.data);
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

  const exportTranscations = async ({
    id,
    amount,
    date,
  }: IFetchTransactionsProps): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      let url = `/export/transactions?walletId=${id}`;

      if (amount === -1 || amount === 1) {
        url += `&amount=${amount}`;
      }
      if (date === -1 || date === 1) {
        url += `&date=${date}`;
      }
      NetworkService.download(url)
        .then((res: any) => {
            toast("Export Transcation", {
              description: `Exporting is done. Check downloads folder`,
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
              duration: 3000,
            });
          resolve(res);
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

  return { getTranscations, loading, exportTranscations, createTranscation };
};
export default useTransactionService;
