import { Outlet } from "react-router-dom";
//user defined
import Header from "@/components/shared/header";

export default function ProtectedLayout() {
  return (
      <main className="flex flex-col overflow-hidden flex-1 max-h-[100vh]">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 bg-primary">
         <Header/>
        </header>
        <div className="flex flex-1 flex-col gap-4 md:gap-8 overflow-x-hidden overflow-y-auto">
          <Outlet/>
        </div>
      </main>
  );
}
