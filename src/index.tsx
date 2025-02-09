import react, {
  useState,
  useEffect,
  forwardRef,
  useMemo,
  useRef,
  CSSProperties,
  useCallback,
} from "react";
import ReactDom from "react-dom";

import { ToastState, toast } from "./state";
import {
  HeightT,
  Position,
  ToasterProps,
  ToastProps,
  ToastToDismiss,
} from "./types";
import { ToastT } from "./types";
import "./styles.css";

// Visible toasts amount
const VISIBLE_TOASTS_AMOUNT = 3;

// Viewport padding
const VIEWPORT_OFFSET = "32px";

// Mobile viewport padding
const MOBILE_VIEWPORT_OFFSET = "16px";

// Default gap between toasts
const GAP = 14;

// Default toast width
const TOAST_WIDTH = 356;

// Default lifetime of a toasts (in ms)
const TOAST_LIFETIME = 4000;

const cn = (...classes: (string | undefined)[]) => {
  classes.filter(Boolean).join(" ");
};

const Toaster = forwardRef<HTMLElement, ToasterProps>((props, ref) => {
  const {
    width = TOAST_WIDTH,
    visibleToasts = VISIBLE_TOASTS_AMOUNT,
    position = "bottom-right",
    duration,
    gap = GAP,
    mobileOffset,
    offset,
    expand,
    swipeDirections,
  } = props;

  const [toasts, setToasts] = useState<ToastT[]>([]);
  const [heights, setHeights] = useState<HeightT[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [interacting, setInteracting] = useState(false);

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
      if ((toast as ToastToDismiss).dismiss) {
        setToasts((prevToasts) =>
          prevToasts.map((t) =>
            t.id === toast.id ? { ...t, delete: true } : t
          )
        );
        return;
      }

      setTimeout(() => {
        ReactDom.flushSync(() => {
          setToasts((prevToasts) => {
            const indexOfExistingToast = prevToasts.findIndex(
              (t) => t.id === toast.id
            );

            // Update the toast if it already exists
            if (indexOfExistingToast !== -1) {
              return [
                ...prevToasts.slice(0, indexOfExistingToast),
                { ...prevToasts[indexOfExistingToast], ...toast },
                ...toasts.slice(indexOfExistingToast + 1),
              ];
            }

            return [...prevToasts, toast as ToastT];
          });
        });
      });
    });
  }, []);

  function assignOffset(
    defaultOffset: ToasterProps["offset"],
    mobileOffset: ToasterProps["mobileOffset"]
  ) {
    const styles = {} as CSSProperties;

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

  const removeToast = useCallback((toastToRemove: ToastT) => {
    setToasts((toasts) => {
      if (!toasts.find((toast) => toast.id === toastToRemove.id)?.delete) {
        ToastState.dismiss(toastToRemove.id);
      }

      return toasts.filter(({ id }) => id !== toastToRemove.id);
    });
  }, []);

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
                "--width": `${width}px`,
                ...assignOffset(offset, mobileOffset),
                "--gap": `${gap}px`,
              } as CSSProperties
            }
          >
            {toasts.map((toast, index) => (
              <Toast
                key={index}
                index={index}
                element={toast.element}
                duration={toast.duration ?? duration}
                position={toast.position ?? position}
                toast={toast}
                toasts={toasts}
                visibleToasts={visibleToasts}
                removeToast={removeToast}
                heights={heights.filter((h) => h.position == toast.position)}
                setHeights={setHeights}
                expandByDefault={expand}
                gap={gap}
                expanded={expanded}
                swipeDirections={swipeDirections}
              />
            ))}
          </ol>
        );
      })}
    </section>
  );
});

const Toast = (props: ToastProps) => {
  const {
    duration: durationFromToaster,
    position,
    element,
    index,
    toast,
    toasts,
    visibleToasts,
    removeToast,
    expanded,
    heights,
    setHeights,
    expandByDefault,
    gap,
    swipeDirections,
  } = props;

  const [swipeDirection, setSwipeDirection] = useState<"x" | "y" | null>(null);
  const [swipeOutDirection, setSwipeOutDirection] = useState<
    "left" | "right" | "up" | "down" | null
  >(null);
  const [mounted, setMounted] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const [swipeOut, setSwipeOut] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);
  const [offsetBeforeRemove, setOffsetBeforeRemove] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const remainingTime = useRef(
    toast.duration || durationFromToaster || TOAST_LIFETIME
  );
  const dragStartTime = useRef<Date | null>(null);
  const toastRef = useRef<HTMLLIElement>(null);
  const isFront = index === 0;
  const isVisible = index + 1 <= visibleToasts;
  const dismissible = toast.dismissible !== false;

  const [y, x] = position!.split("-");
  return (
    <li
      data-headless-toast
      data-y-position={y}
      data-x-position={x}
      data-mounted={mounted}
      data-swiped={isSwiped}
      data-removed={removed}
      data-visible={isVisible}
      data-index={index}
      data-front={isFront}
      data-swiping={swiping}
      data-dismissible={dismissible}
      data-swipe-out={swipeOut}
      data-swipe-direction={swipeOutDirection}
      data-expanded={Boolean(expanded || (expandByDefault && mounted))}
      // style={
      //   {
      //     "--index": index,
      //     "--toasts-before": index,
      //     "--z-index": toasts.length - index,
      //     "--offset": `${removed ? offsetBeforeRemove : offset.current}px`,
      //     "--initial-height": expandByDefault ? "auto" : `${initialHeight}px`,
      //   } as CSSProperties
      // }
    >
      {element}
    </li>
  );
};

export { toast, Toaster, type ToastT, type ToasterProps };
