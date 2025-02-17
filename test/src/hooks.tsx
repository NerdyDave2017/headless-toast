import { toast } from "headless-toast";
import react, { ReactNode } from "react";

// Create a system uing the package to create custom toast systems

class ToastSystem {
  success = (message: ReactNode) => {
    const element = (
      <div className="bg-emerald-200 border-l-emerald-500 border-l-2 w-[356px] h-12 p-4 rounded-md">
        <span className="text-emerald-900">{message}</span>
      </div>
    );

    toast({
      element: (
        <div className="success bg-emerald-200 border-l-emerald-500 border-l-2 w-[356px] h-12 p-4 rounded-md">
          <span className="text-emerald-900">{message}</span>
        </div>
      ),
    });
  };

  error = () => {};

  info = () => {};

  loading = () => {};
}

export const toastSystem = new ToastSystem();
