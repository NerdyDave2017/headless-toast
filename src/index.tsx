import react, { useState, useEffect, forwardRef, useMemo, useRef } from "react";
import { ToastState, toast } from "./state";
import { Position, ToasterProps, ToastProps } from "./types";
import { ToastT } from "./types";
import "./styles.css";

// Viewport padding
const VIEWPORT_OFFSET = "32px";

// Mobile viewport padding
const MOBILE_VIEWPORT_OFFSET = "16px";

// Default gap between toasts
const GAP = 14;

const cn = (...classes: (string | undefined)[]) => {
  classes.filter(Boolean).join(" ");
};

const Toaster = forwardRef<HTMLElement, ToasterProps>((props, ref) => {
  const {
    position = "bottom-right",
    duration,
    gap = GAP,
    mobileOffset,
    offset,
  } = props;

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

  function assignOffset(
    defaultOffset: ToasterProps["offset"],
    mobileOffset: ToasterProps["mobileOffset"]
  ) {
    const styles = {} as React.CSSProperties;

    [defaultOffset, mobileOffset].forEach((offset, index) => {
      const isMobile = index === 1;
      const prefix = isMobile ? "--mobile-offset" : "--offset";
      const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;

      function assignAll(offset: string | number) {
        ["top", "right", "bottom", "left"].forEach((key) => {
          styles[`${prefix}-${key}`] =
            typeof offset === "number" ? `${offset}px` : offset;
        });
      }

      if (typeof offset === "number" || typeof offset === "string") {
        assignAll(offset);
      } else if (typeof offset === "object") {
        ["top", "right", "bottom", "left"].forEach((key) => {
          if (offset[key] === undefined) {
            styles[`${prefix}-${key}`] = defaultValue;
          } else {
            styles[`${prefix}-${key}`] =
              typeof offset[key] === "number"
                ? `${offset[key]}px`
                : offset[key];
          }
        });
      } else {
        assignAll(defaultValue);
      }
    });

    return styles;
  }

  return (
    <section ref={ref}>
      {possiblePositions.map((position) => {
        const [y, x] = position.split("-");

        if (!toasts.length) return null;

        return (
          <ol
            key={position}
            ref={listRef}
            data-headless-toaster
            data-y-position={y}
            data-x-position={x}
            style={
              {
                ...assignOffset(offset, mobileOffset),
                "--gap": `${gap}px`,
              } as React.CSSProperties
            }
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
  const [y, x] = position!.split("-");
  return (
    <li data-headless-toast data-y-position={y} data-x-position={x}>
      {element}
    </li>
  );
};

export { toast, Toaster, type ToastT, type ToasterProps };
