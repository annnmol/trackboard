import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SignUpValidator,
  TSignUpValidator,
  signUpIntialValues,
} from "@/validations/auth-validation";
import { AuthWrapper } from "./auth-wrapper";
import useAuthService from "@/hooks/useAuthService";

export default function RegisterForm() {
  const { loading, signupFn } = useAuthService();

  const form = useForm<TSignUpValidator>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: signUpIntialValues,
  });

  const onSubmit = async (data: TSignUpValidator) => {
    // console.log("submut", data);
    signupFn(data);
  };

  return (
    <>
      <AuthWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account? Login here"
        backButtonHref="/auth/login"
      >
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Anmol Tanwar" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="draft@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We recommend using your personal email
                  </FormDescription>

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
              Create Account
            </Button>
          </form>
        </FormProvider>
      </AuthWrapper>
    </>
  );
}
