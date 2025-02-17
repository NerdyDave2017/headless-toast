import { toast } from "headless-toast";
import react, { ReactNode } from "react";

// Create a system uing the package to create custom toast systems

class ToastSystem {
  success = (message: ReactNode) => {
    const element = (
      <div className="bg-emerald-200 border-l-emerald-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md">
        <span className="text-emerald-900">{message}</span>
      </div>
    );

    toast({
      element,
    });
  };

  error = (message: ReactNode) => {
    const element = (
      <div className="bg-rose-200 border-rose-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md">
        <span className="text-rose-900">{message}</span>
      </div>
    );

    toast({ element });
  };

  info = (message: ReactNode) => {
    const element = (
      <div className="bg-sky-200 border-sky-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md">
        <span className="text-sky-900">This is an info toast</span>
      </div>
    );

    toast({ element });
  };

  loading = (message: ReactNode) => {
    const element = (
      <div className="bg-slate-200 border-slate-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md flex items-center justify-start gap-3">
        <svg
          className="animate-spin h-5 w-5 text-slate-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="text-slate-900">This is a loading toast</span>
      </div>
    );
    toast({ element });
  };
}

export const toastSystem = new ToastSystem();
