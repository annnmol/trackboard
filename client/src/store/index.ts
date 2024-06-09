import { create } from "zustand";
import { persist } from "zustand/middleware";
//user defined
import { LocalStorageService } from "@/services/localstorage";
import { defaultCols, initialTasks } from "@/lib/constants";

export type StoreState = {
  authSession: IAuthSession | any | object;
  setAuthSession: (authSession: any) => void;

  lists: IColumn[];
  setLists: (lists: any[]) => void;

  tasks: ITask[];
  setTasks: (tasks: any[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  removeEverything: () => void;
};

export const useAppStore = create(
  persist(
    (set) => ({
      authSession: LocalStorageService.get("auth-session") || null,
      setAuthSession: async (payload: any) => {
        set({ authSession: payload });
        LocalStorageService.set("auth-session", payload);
      },

      lists: defaultCols,
      setLists: (lists: any) => set({ lists }),

      tasks: initialTasks,
      setTasks: (tasks: any) => set({ tasks }),

      loading: false,
      setLoading: (payload: boolean) => set({ loading: payload }),

      removeEverything: () => set({}, true),
    }),
    {
      name: "auth-session",
      partialize: (state: StoreState) => ({ authSession: state.authSession }),
    }
  )
);

export default useAppStore;
