import react, { useState, useEffect, forwardRef, useMemo, useRef } from "react";
import { ToastState, toast } from "./state";
import { Position, ToasterProps, ToastProps } from "./types";
import { ToastT } from "./types";

const cn = (...classes: (string | undefined)[]) => {
  classes.filter(Boolean).join(" ");
};

const Toaster = forwardRef<HTMLElement, ToasterProps>((props, ref) => {
  const { position = "bottom-right", duration, gap } = props;

  const [toasts, setToasts] = useState<ToastT[]>([]);
  const possiblePositions = useMemo(() => {
    return Array.from(
      new Set(
        [position].concat(
          toasts
            .filter((toast) => toast.position)
            .map((toast) => toast.position) as Position[]
        )
      )
    );
  }, [toasts, position]);

  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    ToastState.subscribe((toast) => {
      setToasts((prevToasts) => [...prevToasts, toast]);
    });
  }, []);

  return (
    <section ref={ref}>
      {possiblePositions.map((position, index) => {
        const [y, x] = position.split("-");

        if (!toasts.length) return null;

        return (
          <ol
            key={position}
            ref={listRef}
            data-headless-toaster
            data-y-position={y}
            data-x-position={x}
          >
            {toasts.map((toast, index) => (
              <Toast
                key={index}
                element={toast.element}
                duration={toast.duration ?? duration}
                position={toast.position ?? position}
              />
            ))}
          </ol>
        );
      })}
    </section>
  );
});

const Toast = ({ duration, position, element }: ToastProps) => {
  return <li data-headless-toast>{element}</li>;
};

export { toast, Toaster, type ToastT, type ToasterProps };
