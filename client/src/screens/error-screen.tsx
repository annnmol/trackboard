import { useRouteError } from "react-router-dom";

export default function ErrorScreen() {
  const error: any = useRouteError();
  return (
    <div className="flex bg-red-600">
      <h2>
        Page not found
        {error?.status}
      </h2>
    </div>
  );
}
