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

export type Element = ReactElement | ReactHTMLElement<any>;

export type ToasterProps = {
  position?: Position;
  duration?: number;
  gap?: number; // space between toasts
};

export type ToastProps = {
  element: Element;
  position?: Position;
  duration?: number;
};
