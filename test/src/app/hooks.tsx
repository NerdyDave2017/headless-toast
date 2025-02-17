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
        <span className="text-sky-900">{message}</span>
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
        <span className="text-slate-900">{message}</span>
      </div>
    );

    return toast({ element });
  };

  promise = (
    promise: Promise<any>,
    { loading, success, error }: Record<string, string>
  ) => {
    const loadingElement = (
      <div className="bg-slate-200 border-slate-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md flex items-center justify-start gap-3">
        <svg
          className="animate-spin h-5 w-5 text-slate-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <rect
            className="opacity-20"
            x="11"
            y="2"
            width="2"
            height="4"
            fill="currentColor"
          />
          <rect
            className="opacity-40"
            x="18"
            y="6"
            width="2"
            height="4"
            transform="rotate(45 18 6)"
            fill="currentColor"
          />
          <rect
            className="opacity-60"
            x="20"
            y="11"
            width="2"
            height="4"
            transform="rotate(90 20 11)"
            fill="currentColor"
          />
          <rect
            className="opacity-80"
            x="18"
            y="18"
            width="2"
            height="4"
            transform="rotate(135 18 18)"
            fill="currentColor"
          />
          <rect
            x="11"
            y="20"
            width="2"
            height="4"
            transform="rotate(180 11 20)"
            fill="currentColor"
          />
          <rect
            className="opacity-80"
            x="4"
            y="18"
            width="2"
            height="4"
            transform="rotate(-135 4 18)"
            fill="currentColor"
          />
          <rect
            className="opacity-60"
            x="2"
            y="11"
            width="2"
            height="4"
            transform="rotate(-90 2 11)"
            fill="currentColor"
          />
          <rect
            className="opacity-40"
            x="4"
            y="6"
            width="2"
            height="4"
            transform="rotate(-45 4 6)"
            fill="currentColor"
          />
        </svg>
        <span className="text-slate-900">{loading}</span>
      </div>
    );

    const successElement = (
      <div className="bg-slate-200 border-slate-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md flex items-center justify-start gap-3">
        <svg
          className="h-5 w-5 text-slate-500"
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
        <span className="text-slate-900">{success}</span>
      </div>
    );

    const errorElement = (
      <div className="bg-slate-200 border-slate-500 border-l-2 w-[356px] h-12 p-2.5 rounded-md flex items-center justify-start gap-3">
        <svg
          className="h-5 w-5 text-slate-500"
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
        <span className="text-slate-900">{error}</span>
      </div>
    );

    const id = toast({ element: loadingElement });

    promise
      .then(() => {
        toast({ element: successElement }, { id });
      })
      .catch(() => {
        toast({ element: errorElement }, { id });
      });
  };
}

export const toastSystem = new ToastSystem();
