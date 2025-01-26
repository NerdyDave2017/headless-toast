import { ReactElement } from "react";

type Toast = ReactElement | HTMLElement;

class Observer {
  subscribers: Array<(toast: Toast) => void>;
  toasts: Array<Toast>;

  constructor() {
    this.subscribers = [];
    this.toasts = [];
  }

  publish(toast: Toast) {
    this.subscribers.forEach((subscriber) => subscriber(toast));
  }

  subscribe(subscriber: (toast: Toast) => void) {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  }

  usubscribe() {}

  addToast(toast: Toast) {
    this.publish(toast);
    this.toasts = [...this.toasts, toast];
  }
}

export const ToastState = new Observer();

const toastFunction = (toast: Toast) => {
  ToastState.addToast(toast);
};

export const toast = toastFunction;
