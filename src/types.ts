import { ReactHTMLElement, ReactElement } from "react";

export interface ToastT {
  id: string | number;
  element: ReactHTMLElement<any> | ReactElement;
  duration?: number;
  position?: Position;
}

export type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";
