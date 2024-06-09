import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", 
    day: "numeric",
    hour: "numeric", 
    minute: "numeric", 
    hour12: true, 
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short", 
    year: "numeric", 
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", 
    minute: "numeric", 
    hour12: true, 
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};


export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const isValidObject = (obj: unknown) => {
  //also check if it has at least one property
  return (
    obj !== null &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj)?.length > 0
  );
};

export const handleError = (
  error: Error | any,
  title: string = "An error occurred"
) => {
  console.error(
    "handle error",
    { title, error },
    Object.keys(error)?.length > 0
  );

  toast.error(title, {
    description: error?.message?.toString() ?? "Failed to fetch",
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
    duration: 3000,
  });

  // throw new Error(error);
};
