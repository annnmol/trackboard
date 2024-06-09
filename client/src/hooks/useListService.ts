import { toast } from "sonner";
//user defined components
import { handleError } from "@/lib/utils";
import { NetworkService } from "@/services/network";
import useAppStore from "@/store";

const useListService = () => {
  const { setLoading, loading, setLists } = useAppStore();

  const createList = async (title: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/lists`;
      NetworkService.post(url, { title })
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("New List created", {
              description: `${title} has been added.`,
              action: {
                label: "Close",
                onClick: () => console.log("close"),
              },
              duration: 3000,
            });
            getLists();
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

  const updateList = async (id: string, data: IList): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/lists/${id}`;
      NetworkService.put(url, data)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("List updated", {
              description: `${data?.title} has been updated.`,
              action: {
                label: "Close",
                onClick: () => console.log("close"),
              },
              duration: 3000,
            });
            getLists();
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

  const deleteList = async (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/lists/${id}`;
      NetworkService.delete(url)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("List Deleted", {
              description: `List has been deleted.`,
              action: {
                label: "Close",
                onClick: () => console.log("close"),
              },
              duration: 3000,
            });
            getLists();
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

  const getLists = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/lists`;

      NetworkService.get(url)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            setLists(res?.data);
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

  const getListById = async (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/lists/${id}`;

      NetworkService.get(url)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            setLists(res?.data);
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


  const reorderList = async (data: IReorderList[]): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/lists/reorder`;
      NetworkService.put(url, data)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("List updated", {
              action: {
                label: "Close",
                onClick: () => console.log("close"),
              },
              duration: 3000,
            });
            setLists(res?.data);
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

  return {
    loading,
    createList,
    getLists,
    updateList,
    deleteList,
    getListById,
    reorderList,
  };
};
export default useListService;
