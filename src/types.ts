import { ReactElement, ReactHTMLElement } from "react";

export interface ToastT {
  id: string | number;
  element: Element;
  position?: Position;
  duration?: number;
}

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

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

export type ToasterProps = {
  position?: Position;
  duration?: number;
  gap?: number; // space between toasts
  offset?: Offset;
  mobileOffset?: Offset;
};

export type ToastProps = {
  element: Element;
  position?: Position;
  duration?: number;
};
