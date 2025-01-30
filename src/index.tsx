import react, { useState, useEffect } from "react";
import { ToastState, toast } from "./state";
import { ToasterProps, ToastProps } from "./types";
import { ToastT } from "./types";

const cn = (...classes: (string | undefined)[]) => {
  classes.filter(Boolean).join(" ");
};

const Toaster = ({ duration, position }: ToasterProps) => {
  const [toasts, setToasts] = useState<ToastT[]>([]);

  useEffect(() => {
    ToastState.subscribe((toast) => {
      setToasts((prevToasts) => [...prevToasts, toast]);
    });
  }, []);

  return (
    <ol>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          element={toast.element}
          duration={toast.duration ? toast.duration : duration}
          position={toast.position ? toast.position : position}
        />
      ))}
    </ol>
  );
};

const Toast = ({ duration, position, element }: ToastProps) => {
  return <li>{element}</li>;
};

export { toast, Toaster, type ToastT, type ToasterProps };
