import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import useAuthService from "@/hooks/useAuthService";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SignInValidator,
  TSignInValidator,
  signInIntialValues,
} from "@/validations/auth-validation";

import { AuthWrapper } from "./auth-wrapper";

export const LoginForm = () => {
  const { loading, loginFn } = useAuthService();

  const form = useForm<TSignInValidator>({
    resolver: zodResolver(SignInValidator),
    defaultValues: signInIntialValues,
  });

  const onSubmit = async (data: TSignInValidator) => {
    // console.log("submut", data);
    loginFn(data);
  };

  return (
    <>
      <AuthWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account? Register here"
        backButtonHref="/auth/register"
      >
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="draft@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </FormProvider>
      </AuthWrapper>
    </>
  );
};
