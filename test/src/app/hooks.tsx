import { toast } from "headless-toast";
import react, { ReactNode } from "react";

// Create a system uing the package to create custom toast systems

class ToastSystem {
  success = (message: ReactNode) => {
    const element = (
      <div className="bg-emerald-200 border-l-emerald-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md flex items-center justify-start gap-3">
        <svg
          className="h-5 w-5 text-emerald-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-emerald-900">{message}</span>
      </div>
    );

    return toast({ element });
  };

  error = (message: ReactNode) => {
    const element = (
      <div className="bg-rose-200 border-rose-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md flex items-center justify-start gap-3">
        <svg
          className="h-5 w-5 text-rose-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-rose-900">{message}</span>
      </div>
    );

    return toast({ element });
  };

  info = (message: ReactNode) => {
    const element = (
      <div className="bg-sky-200 border-sky-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md flex items-center justify-start gap-3">
        <svg
          className="h-5 w-5 text-sky-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sky-900">This is an info toast</span>
      </div>
    );

    return toast({ element });
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

    return toast({ element });
  };

  promise = (
    promise: Promise<unknown>,
    {
      loading,
      success,
      error,
    }: { loading: ReactNode; success: ReactNode; error: ReactNode }
  ) => {
    const loadingToast = this.loading(loading);
    promise
      .then(() => {
        toastSystem.success(success);
      })
      .catch(() => {
        toastSystem.error(error);
      });
  };
}

export const toastSystem = new ToastSystem();
