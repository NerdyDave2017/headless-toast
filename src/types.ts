import { ReactElement, ReactHTMLElement } from "react";

export interface ToastT {
  id: string | number;
  width?: number; // Should be at least the same as the width of the user defined toast width
  element: Element;
  position?: Position;
  loading?: boolean;
  duration?: number;
  delete?: boolean;
  dismissible?: boolean;
  invert?: boolean;
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
}

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

export interface HeightT {
  height: number;
  toastId: number | string;
  position: Position;
}

export type SwipeDirection = "top" | "right" | "bottom" | "left";

type Offset =
  | {
      top?: string | number;
      right?: string | number;
      bottom?: string | number;
      left?: string | number;
    }
  | string
  | number;

export type Element = ReactElement | ReactHTMLElement<any>;

export interface ToasterProps {
  width?: number; // Should be at least the same as the max width of the user defined toast width
  position?: Position;
  duration?: number;
  gap?: number; // space between toasts
  offset?: Offset;
  mobileOffset?: Offset;
  visibleToasts?: number;
  expand?: boolean;
  swipeDirections?: SwipeDirection[];
  pauseWhenPageIsHidden?: Boolean;
}

export interface ToastProps {
  index: number;
  toast: ToastT;
  toasts: ToastT[];
  element: Element;
  position?: Position;
  duration?: number;
  loading?: boolean;
  visibleToasts: number;
  removeToast: (toast: ToastT) => void;
  heights: HeightT[];
  setHeights: React.Dispatch<React.SetStateAction<HeightT[]>>;
  expandByDefault?: boolean;
  gap?: number;
  expanded: boolean;
  swipeDirections?: SwipeDirection[];
  interacting: Boolean;
  pauseWhenPageIsHidden: Boolean;
}
