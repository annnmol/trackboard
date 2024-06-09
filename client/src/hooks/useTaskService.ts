import { toast } from "sonner";
//user defined components
import { handleError } from "@/lib/utils";
import { NetworkService } from "@/services/network";
import useAppStore from "@/store";

const useTaskService = () => {
  const { setLoading, loading, setTasks } = useAppStore();

  const createTask = async (
    title: string,
    priority: string,
    description: string,
    dueDate: Date,
    columnId: string
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/tasks`;
      NetworkService.post(url, { title, priority, description, dueDate, columnId })
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("New Task created", {
              description: `${title} has been added.`,
              action: {
                label: "Close",
                onClick: () => console.log("close"),
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

  const updateTask = async (id: string, data: IColumn): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/tasks/${id}`;
      NetworkService.put(url, { data })
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("Task updated", {
              description: `${data?.title} has been updated.`,
              action: {
                label: "Close",
                onClick: () => console.log("close"),
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

  const deleteTask = async (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/tasks/${id}`;
      NetworkService.delete(url)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("Task Deleted", {
              description: `Task has been deleted.`,
              action: {
                label: "Close",
                onClick: () => console.log("close"),
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

  const getTasks = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/tasks`;

      NetworkService.get(url)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            setTasks(res?.data);
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

  const getTaskById = async (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/tasks/${id}`;

      NetworkService.get(url)
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
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

  const reorderTask = async (data: IReorderList[]): Promise<any> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const url = `/tasks/reorder`;
      NetworkService.put(url, { data })
        .then((res: any) => {
          if (res?.error) {
            handleError(res);
            reject(res);
          } else {
            toast("Tasks updated", {
              action: {
                label: "Close",
                onClick: () => console.log("close"),
              },
              duration: 3000,
            });
            setTasks(res?.data);
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
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskById,
    reorderTask,
  };
};
export default useTaskService;
