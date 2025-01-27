import { ToastT } from "./types";

class Observer {
  subscribers: Array<(toast: ToastT) => void>;
  toasts: Array<ToastT>;

  constructor() {
    this.subscribers = [];
    this.toasts = [];
  }

  publish(toast: ToastT) {
    this.subscribers.forEach((subscriber) => subscriber(toast));
  }

  subscribe(subscriber: (toast: ToastT) => void) {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  }

  usubscribe() {}

  addToast(toast: ToastT) {
    this.publish(toast);
    this.toasts = [...this.toasts, toast];
  }
}

export const ToastState = new Observer();

const toastFunction = (toast: ToastT) => {
  ToastState.addToast(toast);
};

export const toast = toastFunction;
