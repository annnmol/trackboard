import { toast } from "sonner";
import { handleError } from "@/lib/utils";
import useAppStore from "@/store";
import { NetworkService } from "@/services/network";
import { API_ENDPOINTS } from "@/services/endpoints";

const useAuthService = () => {
    const { setLoading,loading, setAuthSession } = useAppStore();

    const loginFn = async (req: IData) => {
        setLoading(true);
        NetworkService.post(API_ENDPOINTS.LOGIN, req).then((res: any) => {
            // console.log(`🚀 ~ file: useAuthService.ts:24 ~ loginFn ~ data:`, res);
            if (res?.error) return handleError(res);
            // set cookies
            setAuthSession(res?.data);

            toast.success("Logged In", {
                description: res?.data?.email ?? "",
                position: "top-center",
                duration: 1500,
            });

        }).catch((error) => {
            handleError(error);
        }).finally(() => {
            setLoading(false);
        });
    };


    const signupFn = async (req: IData) => {
        setLoading(true);
        NetworkService.post(API_ENDPOINTS.SIGNUP, req).then((res: any) => {
            // console.log(`🚀 ~ file: useAuthService.ts:24 ~ signfn ~ data:`, res);
            if (res?.error) return handleError(res);
            // set cookies
            setAuthSession(res?.data);

            toast.success("New Account created", {
                description: res?.data?.email ?? "",
                position: "top-center",
                duration: 1500,
            });

        }).catch((error) => {
            handleError(error);
        }).finally(() => {
            setLoading(false);
        });
    };


    const logoutFn = async () => {
        setLoading(true);
        NetworkService.post(API_ENDPOINTS.LOGOUT, {}).then((res: any) => {
            // console.log(`🚀 ~ file: useAuthService.ts:24 ~ logoutFn ~ data:`, res);
            if (res?.error) return handleError(res);
            
            setAuthSession(null);
            // window.location.reload();
            toast.success("Logged out", {
                description: "",
                position: "top-center",
                duration: 1500,
            });

        }).catch((error) => {
            handleError(error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const getUserByIdFn = async (id: string): Promise<any> => {
        return new Promise((resolve, reject) => {
          setLoading(true);
          const url = `/auth/${id}`;
    
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

    return { loading, loginFn, signupFn, logoutFn, getUserByIdFn };
};
export default useAuthService;