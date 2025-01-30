import react, { useState, useEffect, forwardRef } from "react";
import { ToastState, toast } from "./state";
import { ToasterProps, ToastProps } from "./types";
import { ToastT } from "./types";

const cn = (...classes: (string | undefined)[]) => {
  classes.filter(Boolean).join(" ");
};

const Toaster = forwardRef<HTMLElement, ToastProps>(
  ({ duration, position }, ref) => {
    const [toasts, setToasts] = useState<ToastT[]>([]);

    useEffect(() => {
      ToastState.subscribe((toast) => {
        setToasts((prevToasts) => [...prevToasts, toast]);
      });
    }, []);

    return (
      <section ref={ref}>
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
      </section>
    );
  }
);

const Toast = ({ duration, position, element }: ToastProps) => {
  return <li>{element}</li>;
};

export { toast, Toaster, type ToastT, type ToasterProps };
