import react, { useState, useEffect, ReactNode } from "react";
import { ToastState, toast } from "./state";
import { Position, ToastT } from "./types";

type ToastProps = {
  position?: Position;
  duration?: number;
  toast: ToastT;
};

type ToasterProps = {
  position?: Position;
  duration?: number;
};

const cn = (...classes: (string | undefined)[]) => {
  classes.filter(Boolean).join(" ");
};

export const Toaster = ({ position, duration }: ToasterProps) => {
  const [toasts, setToasts] = useState<ToastT[]>([]);

  useEffect(() => {
    ToastState.subscribe((toast) => {
      setToasts((toasts) => [...toasts, toast]);
    });
  }, []);

  return (
    <ol>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          toast={toast}
          duration={duration}
          position={position}
        />
      ))}
    </ol>
  );
};

const Toast = ({ toast, duration, position }: ToastProps) => {
  return <li>{toast.element}</li>;
};
