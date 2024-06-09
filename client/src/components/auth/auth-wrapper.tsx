import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
//user defined components
import ONBOARD_IMAGE from "@/assets/auth-person.svg";
import { BackButton } from "./back-button";

interface Props {
  children: React.ReactNode;
  headerLabel: string;
  onBoardingLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const AuthWrapper = ({
  children,
  headerLabel,
  onBoardingLabel="Keep track of your tasks at one place.",
  backButtonLabel,
  backButtonHref,
}: Props) => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="hidden bg-muted w-full h-screen lg:flex lg:justify-center lg:items-center lg:flex-col lg:gap-8">
          <img
            src={ONBOARD_IMAGE}
            alt="onboarding-img"
            className="h-[70%] object-fit dark:brightness-[0.2] dark:grayscale"
          />
          <p className="text-2xl font-medium text-slate-700">
           {onBoardingLabel}
          </p>
        </div>
        <div className="flex items-center justify-center py-12 w-full h-screen">
          <Card className="min-w-[350px] md:w-[30rem] shadow-none border-none">
            <CardHeader>
              <Header title="Trackboard" label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>
              <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
