import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
    <Loader2
      className={cn("my-28 h-8 w-8 text-slate-800 animate-spin", className)}
      />
    </div>
  );
};

export default Loader;
