import {
  useState,
  useEffect,
  forwardRef,
  useMemo,
  useRef,
  CSSProperties,
  useCallback,
  useLayoutEffect,
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
import { useIsDocumentHidden } from "./hooks";

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

// Threshold to dismiss a toast
const SWIPE_THRESHOLD = 20;

// Equal to exit animation duration
const TIME_BEFORE_UNMOUNT = 200;

const cn = (...classes: (string | undefined)[]) => {
  classes.filter(Boolean).join(" ");
};

const Toaster = forwardRef<HTMLElement, ToasterProps>((props, ref) => {
  const {
    width = TOAST_WIDTH,
    visibleToasts = VISIBLE_TOASTS_AMOUNT,
    position = "top-center",
    duration,
    gap = GAP,
    mobileOffset,
    offset,
    expand,
    swipeDirections,
    pauseWhenPageIsHidden,
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

  useEffect(() => {
    // Ensure expanded is always false when no toasts are present / only one left
    if (toasts.length <= 1) {
      setExpanded(false);
    }
  }, [toasts]);

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
            data-lifted={expanded && toasts.length > 1 && !expand}
            style={
              {
                "--width": `${width}px`,
                ...assignOffset(offset, mobileOffset),
                "--gap": `${gap}px`,
              } as CSSProperties
            }
            onMouseEnter={() => setExpanded(true)}
            onMouseMove={() => setExpanded(true)}
            onMouseLeave={() => {
              // Avoid setting expanded to false when interacting with a toast, e.g. swiping
              if (!interacting) {
                setExpanded(false);
              }
            }}
            onPointerDown={(event) => {
              const isNotDismissible =
                event.target instanceof HTMLElement &&
                event.target.dataset.dismissible === "false";

              if (isNotDismissible) return;
              setInteracting(true);
            }}
            onPointerUp={() => setInteracting(false)}
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
                interacting={interacting}
                pauseWhenPageIsHidden={!!pauseWhenPageIsHidden}
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
    interacting,
    pauseWhenPageIsHidden,
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

  // Height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
  const heightIndex = useMemo(
    () => heights.findIndex((height) => height.toastId === toast.id) || 0,
    [heights, toast.id]
  );

  const duration = useMemo(
    () => toast.duration || durationFromToaster || TOAST_LIFETIME,
    [toast.duration, durationFromToaster]
  );

  const closeTimerStartTimeRef = useRef(0);
  const offset = useRef(0);
  const lastCloseTimerStartTimeRef = useRef(0);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const [y, x] = position!.split("-");
  const toastsHeightBefore = useMemo(() => {
    return heights.reduce((prev, curr, reducerIndex) => {
      // Calculate offset up until current toast
      if (reducerIndex >= heightIndex) {
        return prev;
      }

      return prev + curr.height;
    }, 0);
  }, [heights, heightIndex]);

  const isDocumentHidden = useIsDocumentHidden();

  offset.current = useMemo(
    () => heightIndex * gap! + toastsHeightBefore,
    [heightIndex, toastsHeightBefore]
  );

  const deleteToast = useCallback(() => {
    // Save the offset for the exit swipe animation
    setRemoved(true);
    setOffsetBeforeRemove(offset.current);
    setHeights((h) => h.filter((height) => height.toastId !== toast.id));

    setTimeout(() => {
      removeToast(toast);
    }, TIME_BEFORE_UNMOUNT);
  }, [toast, removeToast, setHeights, offset]);

  useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true);
  }, []);

  useEffect(() => {
    const toastNode = toastRef.current;
    if (toastNode) {
      const height = toastNode.getBoundingClientRect().height;
      // Add toast height to heights array after the toast is mounted
      setInitialHeight(height);
      setHeights((h) => [
        { toastId: toast.id, height, position: toast.position! },
        ...h,
      ]);
      return () =>
        setHeights((h) => h.filter((height) => height.toastId !== toast.id));
    }
  }, [setHeights, toast.id]);

  useLayoutEffect(() => {
    if (!mounted) return;

    const toastNode = toastRef.current;
    if (toastNode) {
      const originalHeight = toastNode.style.height;
      toastNode.style.height = "auto";
      const newHeight = toastNode.getBoundingClientRect().height;
      toastNode.style.height = originalHeight;

      setInitialHeight(newHeight);

      setHeights((heights) => {
        const alreadyExists = heights.find(
          (height) => height.toastId === toast.id
        );
        if (!alreadyExists) {
          return [
            { toastId: toast.id, height: newHeight, position: toast.position! },
            ...heights,
          ];
        } else {
          return heights.map((height) =>
            height.toastId === toast.id
              ? { ...height, height: newHeight }
              : height
          );
        }
      });
    }
  }, [mounted, setHeights, toast.id]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Pause the timer on each hover
    const pauseTimer = () => {
      if (lastCloseTimerStartTimeRef.current < closeTimerStartTimeRef.current) {
        // Get the elapsed time since the timer started
        const elapsedTime =
          new Date().getTime() - closeTimerStartTimeRef.current;

        remainingTime.current = remainingTime.current - elapsedTime;
      }

      lastCloseTimerStartTimeRef.current = new Date().getTime();
    };

    const startTimer = () => {
      // setTimeout(, Infinity) behaves as if the delay is 0.
      // As a result, the toast would be closed immediately, giving the appearance that it was never rendered.
      // See: https://github.com/denysdovhan/wtfjs?tab=readme-ov-file#an-infinite-timeout
      if (remainingTime.current === Infinity) return;

      closeTimerStartTimeRef.current = new Date().getTime();

      // Let the toast know it has started
      timeoutId = setTimeout(() => {
        toast.onAutoClose?.(toast);
        deleteToast();
      }, remainingTime.current);
    };

    // if (
    //   expanded ||
    //   interacting ||
    //   (pauseWhenPageIsHidden && isDocumentHidden)
    // ) {
    //   pauseTimer();
    // } else {
    //   startTimer();
    // }

    return () => clearTimeout(timeoutId);
  }, [
    expanded,
    interacting,
    toast,
    pauseWhenPageIsHidden,
    isDocumentHidden,
    deleteToast,
  ]);

  useEffect(() => {
    if (toast.delete) {
      deleteToast();
    }
  }, [deleteToast, toast.delete]);

  return (
    <li
      ref={toastRef}
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
      style={
        {
          "--index": index,
          "--toasts-before": index,
          "--z-index": toasts.length - index,
          "--offset": `${removed ? offsetBeforeRemove : offset.current}px`,
          "--initial-height": expandByDefault ? "auto" : `${initialHeight}px`,
        } as CSSProperties
      }
    >
      {element}
    </li>
  );
};

export { toast, Toaster, type ToastT, type ToasterProps };
